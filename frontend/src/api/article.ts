export interface Article {
    id: number
    title: string
    content: string
    release_date: Date
  }
  
const currentDate = new Date()
  
const articles: Article[] = [
{ 
    id: 1, 
    title: 'Article title', 
    content: 'No Pulitzer candidate here, lets focus on the code.', 
    release_date: new Date(currentDate.setFullYear(currentDate.getFullYear()))
},
{ 
    id: 2, 
    title: 'Article title1', 
    content: 'No Pulitzer candidate here, lets focus on the code1.', 
    release_date: new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
},
{ 
    id: 3, 
    title: 'Article title2', 
    content: 'No Pulitzer candidate here, lets focus on the code2.', 
    release_date: new Date(currentDate.setFullYear(currentDate.getFullYear() - 2))
},
{ 
    id: 4, 
    title: 'Article title3', 
    content: 'No Pulitzer candidate here, lets focus on the code3.', 
    release_date: new Date(currentDate.setFullYear(currentDate.getFullYear() - 3))
},
]

let id_counter = 4;

export async function getArticles(): Promise<Article[]> {
  return new Promise((resolve) => {
    () => {
      resolve(articles)
    }
  })
}

export async function createArticle(article: Article): Promise<Article> {
  return new Promise((resolve, reject) => {
    () => {
      if (!article.title) {
        reject(new Error('Title is required!'))
      }
      if (!article.content) {
        reject(new Error('Content is required!'))
      }
      const newArticle = { ...article, id: id_counter++ }
      articles.push(newArticle)
      resolve(newArticle)
    }
  })
}

export async function updateArticle(article: Article): Promise<Article> {
  return new Promise((resolve, reject) => {
    () => {
        if (!article.title) {
            reject(new Error('Title is required!'))
        }
        if (!article.content) {
            reject(new Error('Content is required!'))
        }
      const index = articles.findIndex((a) => a.id === article.id)
      if (index === -1) {
        reject(new Error('Article not found!'))
      }
      articles[index] = { ...articles[index], ...article }
      resolve(articles[index])
    }
  })
}

export async function deleteArticle(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    () => {
      const index = articles.findIndex((article) => article.id === id)
      if (index === -1) {
        reject(new Error('Article not found!'))
      }
      articles.splice(index, 1)
      resolve()
    }
  })
}
