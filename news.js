document.addEventListener("DOMContentLoaded", (e) => {
  renderNews(`offset=0&category__in[]=214&category__in[]=16829&posts_per_page=1`, 1)
  renderNews(`offset=1&category__in[]=214&category__in[]=16829&posts_per_page=1`, 2)
})

function renderNews(queryString, position)
{
  fetch(`https://playmaker24.ru/wp-json/wp_query/args/?${queryString}`)
    .then(response => {
      return response.json()
    }).then(post => {
      console.table(post)
      const link = post[0].link
      const date = post[0].date
      const title = post[0].title.rendered
      const excerpt = post[0].excerpt.rendered

      const elements = getTargetHTMLElements(position)

      elements.date.textContent = timeago.format(date, 'ru')

      elements.title.innerHTML = `<a href="${link}" target="_blank">${title}</a>`
      elements.excerpt.innerHTML = excerpt
      elements.link.innerHTML = `<a href="${link}" target="_blank">Читать новость</a>`

    })
    .catch(console.error)
}

function getTargetHTMLElements(position)
{
  if (!position) throw new Error("Агрумент position обязателен!")
  const date = document.querySelector(`.post${position}_date .tn-atom`)
  const title = document.querySelector(`.post${position}_title .tn-atom`)
  const excerpt = document.querySelector(`.post${position}_excerpt .tn-atom`)
  const link = document.querySelector(`.post${position}_link .tn-atom`)

  return { link, date, title, excerpt }
}