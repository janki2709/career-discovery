// src/app/api/resource-progress/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getSupabase() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // no-op for route handlers
        },
      },
    }
  )
}

/**
 * POST
 * Mark resource as completed
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await getSupabase()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { resourceId } = body

    if (!resourceId) {
      return NextResponse.json(
        { error: 'resourceId is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('user_resource_progress')
      .upsert(
        {
          user_id: user.id,
          learning_resource_id: resourceId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,learning_resource_id',
        }
      )

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      completed: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE
 * Mark resource as incomplete
 */
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await getSupabase()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const resourceId = searchParams.get('resourceId')

    if (!resourceId) {
      return NextResponse.json(
        { error: 'resourceId is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('user_resource_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('learning_resource_id', resourceId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      completed: false,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}