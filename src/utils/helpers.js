export const sortByPosition = data =>
  data.sort((a, b) => {
    return a.position - b.position
  })

export const setToken = () => {
  const storedUser = window.localStorage.getItem('loggedChaosBoardUser')
  if (storedUser && typeof storedUser !== 'undefined') {
    const storedToken = JSON.parse(storedUser).token
    return `Bearer ${storedToken}`
  }
  window.localStorage.removeItem('loggedChaosBoardUser')
  return null
}
