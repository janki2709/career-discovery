import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ careerId: string }> }
) {
  const supabase = await createClient()

  // Get URL param
  const { careerId } = await params

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Delete saved career for current user
  const { error } = await supabase
    .from('saved_careers')
    .delete()
    .eq('user_id', user.id)
    .eq('career_id', careerId)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
  })
}