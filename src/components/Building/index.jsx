import './styles.css'
import Image from '../../multimedia/construction.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';

const Building = () => {
  const mobile = useMediaQuery('(max-width: 780px)');
  return (
    <>
      {!mobile && (
        <div className="build_main">
          <div className="build-text">
            <p className="build-text-1">¡Lo sentimos!</p>
            <p className="build-text-2">En Construcción</p>
            <p className="build-text-3">Actualmente esta sección del sitio web se encuentra en desarrollo,
              lamentamos los inconvenientes y te invitamos a que navegues por otras secciones,
              esta parte estará lista muy pronto. <span>¡Gracias!</span>
            </p>
          </div>
          <div className="build-image">
            <img src={Image} alt="building sction" />
          </div>
        </div>
      )}
      {mobile && (
        <div className="build-main_mobile">
          <div className="build-image-mobile">
            <img src={Image} alt="building sction" />
          </div>
          <div className="build-text-mobile">
            <p className="build-text-1">¡Lo sentimos!</p>
            <p className="build-text-2-mobile">En Construcción</p>
            <p className="build-text-3-mobile">Actualmente esta sección del sitio web se encuentra en desarrollo,
              lamentamos los inconvenientes y te invitamos a que navegues por otras secciones,
              esta parte estará lista muy pronto. <span>¡Gracias!</span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Building;
