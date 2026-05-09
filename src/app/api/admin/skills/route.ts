import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } =
      await supabase
        .from('skills')
        .select(`
          *,
          careers (
            id,
            title
          )
        `)
        .order('created_at', {
          ascending: false,
        })

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
        error: 'Failed to fetch skills',
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
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
        .insert(payload)
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
        error: 'Failed to create skill',
      },
      { status: 500 }
    )
  }
}