export const getToken = state => state.user.token
export const getFrom = state =>
  state.router.location.state && state.router.location.state.from
    ? state.router.location.state.from
    : { pathname: '/home' }
