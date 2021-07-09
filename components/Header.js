import headerStyles from '../styles/Header.module.css'

function Header() {
    const x = 4;
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span>Netflix</span> News
            </h1>
            <p className={headerStyles.description}>
                Keep up to date with the latest movies and shows
            </p>
        </div>
    )
}

export default Header
