// authentication part https://scotch.io/tutorials/implementing-authentication-in-nuxtjs-app
// depot git https://github.com/ammezie/nuxt-auth-app
export default function ({
  store,
  redirect
}) {
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
