export const sortByPosition = data =>
  data.sort((a, b) => {
    return a.position > b.position
  })
