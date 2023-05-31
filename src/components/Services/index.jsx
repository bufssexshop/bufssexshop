import './styles.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

const Services = () => {

  const mobile = useMediaQuery('(max-width: 780px)');

  return(
    <div className={`services_container ${mobile && 'services_container_mobile'}`}>
      <div className={`services_info ${mobile && 'services_info_mobile'}`}>
        <p className="services_info_title">Nuestros Servicios</p>
        <p className="services_info_subtitle">¿Qué ofrecemos?</p>
        <p className="services_info_description">Venta y distribución de productos sexuales los cuales cuentan con
        registro sanitario invima, tambien brindamos asesorias, contenido y entretenimiento para adultos.
        Contáctanos, haz tus pedidos directo al whatsapp <WhatsAppIcon sx={{ color: '#ff7bac', marginBottom: '-5px'}} /> <span>304 458 0143</span>, pregunta por precios, promociones,
        medios de pago y más.
        </p>
      </div>
      <div className={`services_cards ${mobile && 'services_cards_mobile'}`}>
        <div className={`card_one card_services ${mobile && 'card_services_mobile'}`}>
          <div className="services_icon">
            <LocalShippingOutlinedIcon id="shipping"/>
          </div>
          <div className="services_card_title">
            <p>Envíos Discretos</p>
          </div>
          <div className="services_card_description">
            <p>Envíos seguros a todos el pais totalmente confidenciales, con entregas directas.
            </p>
          </div>
        </div>
        <div className={`card_two card_services ${mobile && 'card_services_mobile'}`}>
          <div className="services_icon">
            <CreditCardIcon id="shopping" />
          </div>
          <div className="services_card_title">
            <p>Compras fácil</p>
          </div>
          <div className="services_card_description">
            <p>Paga fácil con cualquiera de nuestros medios de pago:
              Codido QR, Pago en linea, Tarjetas credito y debito,
              Transferencias.
            </p>
          </div>
        </div>
        <div className={`card_three card_services ${mobile && 'card_services_mobile'}`}>
          <div className="services_icon">
            <TransferWithinAStationIcon id="transfer" />
          </div>
          <div className="services_card_title">
            <p>Distribución</p>
          </div>
          <div className="services_card_description">
            <p>Aenean sit amet leo vitae tellus vehicula tincidunt vel sed lorem.
              Nullam tincidunt commodo magna, id aliquam sapien sollicitudin id.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services;