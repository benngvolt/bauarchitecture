import  './DNDGrid.scss'

function DNDGrid ({children, displayClass}) {
    
    return (
        <div className={displayClass==='grid'?'dndGrid':(displayClass==='articlesGrid'?'dndArticlesGrid':'dndColumn')}>
            {children}
        </div>
    );
}
export default DNDGrid