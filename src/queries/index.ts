import { createDiscordAuthorizationURL } from '@/actions/discord'
import { createGithubAuthorizationURL } from '@/actions/github'
import { createGoogleAuthorizationURL } from '@/actions/google'
import { toast } from 'sonner'

export const onGithubSignInClicked = async () => {
  const res = await createGithubAuthorizationURL()
  if (res.error) {
    toast.error(res.error)
  } else if (res.success) {
    window.location.href = res.data.toString()
  }
}

export const onGoogleSignInClicked = async () => {
  const res = await createGoogleAuthorizationURL()
  if (res.error) {
    toast.error(res.error)
  } else if (res.success) {
    window.location.href = res.data.toString()
  }
}

export const onDiscordSignInClicked = async () => {
  const res = await createDiscordAuthorizationURL()
  if (res.error) {
    toast.error(res.error)
  }
  if (res.success) {
    window.location.href = res.data.toString()
  }
}
