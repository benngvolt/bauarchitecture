import  './DNDGrid.scss'

function DNDGrid ({children, displayClass}) {
    
    return (
        <div className={displayClass==='grid'?'dndGrid':'dndRow'}>
            {children}
        </div>
    );
}
export default DNDGrid