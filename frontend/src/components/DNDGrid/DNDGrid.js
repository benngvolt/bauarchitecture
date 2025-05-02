import  './DNDGrid.scss'

function DNDGrid ({children, displayClass}) {
    
    return (
        <div className={displayClass==='grid'?'dndGrid':(displayClass==='tripsGrid'?'dndTripsGrid':'dndColumn')}>
            {children}
        </div>
    );
}
export default DNDGrid