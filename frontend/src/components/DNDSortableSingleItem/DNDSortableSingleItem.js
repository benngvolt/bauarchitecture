import './DNDSortableSingleItem.scss'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan, faCertificate, faCircle, faBolt} from '@fortawesome/free-solid-svg-icons'

export const DNDSortableSingleItem = (props) => {
  const sortable = useSortable({id: props.itemId});
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = sortable;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  /*-------------------------------------------------
  ----- CHOISIR LA PHOTO PRINCIPALE DE LA SÉRIE -----
  -------------------------------------------------*/

  function handleMainImage(index) {
      if (index >= 0 && index <= props.imageFiles.length -1) {
        props.setMainImageIndex(index)
      } else {
        props.setMainImageIndex(0)
      }
  }

  // function handleRandomImageSelection() {
  //   if (props.item.inRandomSelection === false) {
  //       props.item.inRandomSelection = true
  //   } else {
  //       props.item.inRandomSelection = false
  //   }
  // }


  return (
    <div ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}>
      <img className={props.displayClass==='grid'?'dndItem_image':'dndRowItem_image'}
        src={props.item.imageUrl ?? (props.item instanceof File ? props.item.sampleImageUrl : '')}
        alt={`image ${props.item._id}`}/>
      <div className='dndItem_buttons'>
          <button type='button' aria-label="Supprimer l'image" className='dndItem_buttons_supprButton'
            onMouseDown={() => {
              props.openConfirmBox(props.index);
            }}
            draggable="false"
            >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          { props.displayClass==='grid' &&
          <button type='button' aria-label="Définir cette image comme image principale de la série" className='dndItem_buttons_isMainButton'
            onMouseDown={() => { handleMainImage(props.index)}} >
            <FontAwesomeIcon icon={props.index === props.mainImageIndex ? faCertificate : faCircle} className={props.index === props.mainImageIndex ? 'dndItem_buttons_isMainButton--isOrange' : 'dndItem_buttons_isMainButton--isWhite'} />
          </button>
          }
          {/* { props.displayClass==='grid' &&
          <button type='button' aria-label="Définir cette image comme image random de la landing-page" className='dndItem_buttons_inRandomSelectionButton'
            onMouseDown={() => handleRandomImageSelection()} >
            <FontAwesomeIcon icon={faBolt} 
            className={props.item.inRandomSelection === true ? 'dndItem_buttons_inRandomSelectionButton--isOrange' : 'dndItem_buttons_inRandomSelectionButton--isWhite'} 
            />
          </button>
          } */}
      </div>
    </div>
  );
};
