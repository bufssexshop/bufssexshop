import "./styles.css";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import { subcategorias } from '../../utils/categories';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import RenderList from "../RenderList";

const MenuProductos = () => {

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#ff7bac' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  return (
    <div className="menu_productos_container">
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <p className="menu_producto_category">Juguetes</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="menu_productos_ul">
            <ul>
              {subcategorias.juguetes.map((item, index) => (
                <RenderList item={item} index={index} />
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <p className="menu_producto_category">Lubricantes</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="menu_productos_ul">
            <ul>
              {subcategorias.lubricantes.map((item, index) => (
                <RenderList item={item} index={index} />
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <p className="menu_producto_category">Lencería</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="menu_productos_ul">
            <ul>
              {subcategorias.lenceria.map((item, index) => (
                <RenderList item={item} index={index} />
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <p className="menu_producto_category">Fetiche</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="menu_productos_ul">
            <ul>
              {subcategorias.fetiche.map((item, index) => (
                <RenderList item={item} index={index} />
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <p className="menu_producto_category">Higiene & protección</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="menu_productos_ul">
            <ul>
              {subcategorias.higieneyproteccion.map((item, index) => (
                <RenderList item={item} index={index} />
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <p className="menu_producto_category">Más</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="menu_productos_ul">
            <ul>
              {subcategorias.mas.map((item, index) => (
                <RenderList item={item} index={index} />
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default MenuProductos;
