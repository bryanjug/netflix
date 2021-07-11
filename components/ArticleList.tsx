import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'

interface Props {
    articles: {
        id: number;
        title: string;
        excerpt: string;
    }
}

const ArticleList:React.FC<Props> = ({articles}) => {
    return (
        <div className={articleStyles.grid}>
            {
                articles instanceof Array ?
                articles.map(article => (
                    <ArticleItem article={article} key={article.id}/>
                ))
                :
                null
            }
        </div>
    )
}

export default ArticleList
