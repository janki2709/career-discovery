import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await params

    const supabase = await createClient()

    const { data, error } =
      await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to fetch skill',
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await params

    const body = await req.json()

    const supabase = await createClient()

    const payload = {
      name: body.name || null,
      slug: body.slug || null,
      description:
        body.description || null,
    }

    const { data, error } =
      await supabase
        .from('skills')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to update skill',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await params

    const supabase = await createClient()

    const { error } =
      await supabase
        .from('skills')
        .delete()
        .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to delete skill',
      },
      { status: 500 }
    )
  }
}