renderNews(`offset=0&category__in[]=214&category__in[]=16829&posts_per_page=1`)
renderNews(`offset=1&category__in[]=214&category__in[]=16829&posts_per_page=1`)

function renderNews(queryString, position = 1)
{
  fetch(`https://playmaker24.ru/wp-json/wp_query/args/?${queryString}`)
    .then(response => {
      return response.json()
    }).then(body => {
      console.log(body);
    })
    .catch(console.error)
}