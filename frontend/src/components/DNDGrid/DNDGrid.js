import  './DNDGrid.scss'

function DNDGrid ({children, displayClass}) {
    
    return (
        <div className={displayClass==='grid'?'dndGrid':'dndColumn'}>
            {children}
        </div>
    );
}
export default DNDGrid