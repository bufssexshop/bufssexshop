import "./styles.css";
import { useEffect } from "react";
import Highcharts from 'highcharts'
import PollIcon from '@mui/icons-material/Poll';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { useDispatch, useSelector } from "react-redux";
import HighchartsReact from 'highcharts-react-official';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { getIndicators } from '../../services/indicators';

const General = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getIndicators(dispatch);
  }, [])

  const { indicators } = useSelector(({
    ProductReducer
  }) => ({
    indicators: ProductReducer.indicators,
  }))

  const { cantidad, promociones, inactivos, usuarios } = indicators;

  const options = {
    title: {
      text: 'Indicador General'
    },
    series: [{
      type: 'pie',
      name: 'total',
      data: [
        ['Total Productos', cantidad],
        ['Promociones', promociones],
        ['Productos Inactivos', inactivos],
        ['Total usuarios', usuarios]
      ]
    }]
  }

  return (
    <>
      <div className="indicators">
        <div className="indicators-total-visits">
          <div className="indicators-card-first-part">
            <div className="indicator-card-icon">
              <PollIcon
                sx={{ color: '#373650'}}
                fontSize="large"
              />
            </div>
          </div>
          <div className="indicators-card-second-part">
            <p className="indicators-numbers">{cantidad}</p>
            <p className="indicator-products-title">Total Productos</p>
          </div>
        </div>


        <div className="indicators-total-products">
          <div className="indicators-card-first-part">
            <div className="indicator-card-icon">
              <SwapVertIcon
                sx={{ color: '#373650'}}
                fontSize="large"
              />
            </div>
          </div>
          <div className="indicators-card-second-part">
            <img
              src="https://counter2.stat.ovh/private/contadorvisitasgratis.php?c=ectl8y9ylqbl29tmhs8n4e7htep55aus"
              border="0"
              title="contador de visitas"
              alt="contador de visitas"
            />
            <p className="indicator-products-title">Total Visitas</p>
          </div>
        </div>

        <div className="indicators-total-visits">
          <div className="indicators-card-first-part">
            <div className="indicator-card-icon">
              <LoyaltyIcon
                sx={{ color: '#373650'}}
                fontSize="large"
              />
            </div>
          </div>
          <div className="indicators-card-second-part">
            <p className="indicators-numbers">{promociones}</p>
            <p className="indicator-products-title">Total Promociones</p>
          </div>
        </div>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </>
  )
}

export default General;

