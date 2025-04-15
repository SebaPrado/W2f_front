import React, { useState } from 'react';
import './Home0.css';
import Navbar from './Navbar';
// import "./home.css";

const Home0 = () => {
  // Estado para controlar qué preguntas del FAQ están expandidas
  const [expandedFaqs, setExpandedFaqs] = useState({});
  
  // Función para manejar la expansión/contracción de las preguntas del FAQ
  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
        <div>
         <Navbar/>
        </div>
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>What to farm </h1>
          {/* <h2>Datos en tiempo real para decisiones agrícolas</h2> */}
          <p className='mb-5'>Datos en tiempo real para decisiones agrícolas</p>
          <button className="cta-button">Contactanos</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-title">
          <h2>NUESTROS SERVICIOS</h2>
          <div className="title-divider"></div>
        </div>
        <div className="services-container">
          <div className="service-card">
            <div className="service-icon">
              <i className="service-img web-design"></i>
            </div>
            <h3>Diseño Web</h3>
            <p>Creamos sitios web atractivos, responsivos y optimizados para todos los dispositivos.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="service-img ecommerce"></i>
            </div>
            <h3>Tiendas Online</h3>
            <p>Desarrollamos tiendas virtuales completas con gestión de inventario y pagos seguros.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="service-img seo-marketing"></i>
            </div>
            <h3>SEO y Marketing</h3>
            <p>Mejoramos la visibilidad de tu negocio con estrategias de SEO y marketing digital.</p>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="parallax-section">
        <div className="parallax-content">
          <h2>Aprovechá todo <span>nuestro potencial</span></h2>
          <p>Para customizar todos tus costos e insumos y obtener tus márgenes más exactos, contrata la membresía.</p>
          <button className="cta-button">Suscribirse ahora</button>
        </div>
      </section>

      {/* Crop Costs Section */}
      <section className="crop-costs-section">
        <div className="section-title">
          <h2>ANÁLISIS DE COSTOS DE CULTIVOS</h2>
          <div className="title-divider"></div>
        </div>
        <div className="crops-container">
          {/* Maíz */}
          <div className="crop-card">
            <h3 className="crop-title">Maíz</h3>
            <div className="crop-data">
              <div className="crop-row">
                <span className="crop-label">Precio del grano</span>
                <span className="crop-value">172</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Rinde</span>
                <span className="crop-value">2</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Ingreso</span>
                <span className="crop-value">345</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Costo Arrendamiento</span>
                <span className="crop-value">128</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Costo Insumos</span>
                <span className="crop-value">25</span>
              </div>
            </div>
            <div className="margin-container">
              <div className="margin-label">
                <span>Margen</span>
                <span>Bruto</span>
              </div>
              <div className="margin-value">221</div>
            </div>
          </div>

          {/* Soja */}
          <div className="crop-card">
            <h3 className="crop-title">Soja</h3>
            <div className="crop-data">
              <div className="crop-row">
                <span className="crop-label">Precio del grano</span>
                <span className="crop-value">172</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Rinde</span>
                <span className="crop-value">2</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Ingreso</span>
                <span className="crop-value">345</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Costo Arrendamiento</span>
                <span className="crop-value">128</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Costo Insumos</span>
                <span className="crop-value">25</span>
              </div>
            </div>
            <div className="margin-container">
              <div className="margin-label">
                <span>Margen</span>
                <span>Bruto</span>
              </div>
              <div className="margin-value">221</div>
            </div>
          </div>

          {/* Trigo */}
          <div className="crop-card">
            <h3 className="crop-title">Trigo</h3>
            <div className="crop-data">
              <div className="crop-row">
                <span className="crop-label">Precio del grano</span>
                <span className="crop-value">172</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Rinde</span>
                <span className="crop-value">2</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Ingreso</span>
                <span className="crop-value">345</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Costo Arrendamiento</span>
                <span className="crop-value">128</span>
              </div>
              <div className="crop-row">
                <span className="crop-label">Costo Insumos</span>
                <span className="crop-value">25</span>
              </div>
            </div>
            <div className="margin-container">
              <div className="margin-label">
                <span>Margen</span>
                <span>Bruto</span>
              </div>
              <div className="margin-value">221</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-title light">
          <h2>¿POR QUÉ ELEGIRNOS?</h2>
          <div className="title-divider light"></div>
        </div>
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">
              <i className="feature-img responsive"></i>
            </div>
            <h3>Diseño Responsivo</h3>
            <p>Tu sitio web se adaptará perfectamente a cualquier dispositivo.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <i className="feature-img seo"></i>
            </div>
            <h3>Optimización SEO</h3>
            <p>Posicionamiento en buscadores para aumentar tu visibilidad online.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <i className="feature-img support"></i>
            </div>
            <h3>Soporte Continuo</h3>
            <p>Asistencia técnica y mantenimiento para tu tienda online.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <i className="feature-img security"></i>
            </div>
            <h3>Seguridad Garantizada</h3>
            <p>Protección de datos y transacciones seguras para tus clientes.</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-title">
          <h2>NUESTRO PROCESO</h2>
          <div className="title-divider"></div>
        </div>
        <div className="process-container">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Planificación</h3>
            <p>Analizamos tus necesidades y planificamos la estructura de tu tienda online.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Diseño</h3>
            <p>Creamos un diseño atractivo y funcional que refleje la identidad de tu marca.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Desarrollo</h3>
            <p>Implementamos todas las funcionalidades necesarias para tu tienda online.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Lanzamiento</h3>
            <p>Realizamos pruebas exhaustivas antes de lanzar tu tienda al mercado.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-title">
          <h2>PREGUNTAS FRECUENTES</h2>
          <div className="title-divider"></div>
        </div>
        <div className="faq-container">
          <div className="faq-item">
            <div 
              className={`faq-question ${expandedFaqs[1] ? 'active' : ''}`} 
              onClick={() => toggleFaq(1)}
            >
              <h3>¿Qué es el margen bruto?</h3>
              <span className="faq-toggle">{expandedFaqs[1] ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${expandedFaqs[1] ? 'expanded' : ''}`}>
              <p>El margen bruto es la diferencia entre los ingresos totales y los costos directos asociados con la producción. En agricultura, representa la ganancia por hectárea después de restar los costos de insumos y arrendamiento del ingreso bruto generado por la venta de cultivos.</p>
            </div>
          </div>

          <div className="faq-item">
            <div 
              className={`faq-question ${expandedFaqs[2] ? 'active' : ''}`} 
              onClick={() => toggleFaq(2)}
            >
              <h3>¿Cómo calcular el margen bruto?</h3>
              <span className="faq-toggle">{expandedFaqs[2] ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${expandedFaqs[2] ? 'expanded' : ''}`}>
              <p>Para calcular el margen bruto en cultivos:</p>
              <ol>
                <li>Determina el ingreso total (Precio del grano × Rendimiento)</li>
                <li>Suma todos los costos directos (Arrendamiento + Insumos)</li>
                <li>Resta los costos directos del ingreso total</li>
              </ol>
              <p>La fórmula es: Margen Bruto = Ingreso Total - (Costo Arrendamiento + Costo Insumos)</p>
            </div>
          </div>

          <div className="faq-item">
            <div 
              className={`faq-question ${expandedFaqs[3] ? 'active' : ''}`} 
              onClick={() => toggleFaq(3)}
            >
              <h3>¿Por qué son importantes estos cultivos?</h3>
              <span className="faq-toggle">{expandedFaqs[3] ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${expandedFaqs[3] ? 'expanded' : ''}`}>
              <p>Maíz, soja y trigo son cultivos fundamentales en la agricultura global:</p>
              <ul>
                <li><strong>Maíz:</strong> Esencial para alimentación humana, animal y producción de biocombustibles.</li>
                <li><strong>Soja:</strong> Principal fuente de proteína vegetal y aceite para consumo humano e industrial.</li>
                <li><strong>Trigo:</strong> Base de la alimentación humana en muchas regiones, utilizado para harinas y derivados.</li>
              </ul>
              <p>Estos cultivos representan la base de la seguridad alimentaria mundial y son pilares económicos para muchos países agrícolas.</p>
            </div>
          </div>

          <div className="faq-item">
            <div 
              className={`faq-question ${expandedFaqs[4] ? 'active' : ''}`} 
              onClick={() => toggleFaq(4)}
            >
              <h3>¿Qué factores afectan los precios de los cultivos?</h3>
              <span className="faq-toggle">{expandedFaqs[4] ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${expandedFaqs[4] ? 'expanded' : ''}`}>
              <p>Los precios de los cultivos están influenciados por múltiples factores:</p>
              <ul>
                <li>Oferta y demanda global</li>
                <li>Condiciones climáticas y desastres naturales</li>
                <li>Políticas comerciales y aranceles internacionales</li>
                <li>Niveles de inventario y reservas mundiales</li>
                <li>Valor del dólar y fluctuaciones de divisas</li>
                <li>Costos de producción e insumos</li>
                <li>Especulación en mercados de futuros</li>
              </ul>
              <p>La interacción de estos factores genera la volatilidad característica de los mercados agrícolas.</p>
            </div>
          </div>

          <div className="faq-item">
            <div 
              className={`faq-question ${expandedFaqs[5] ? 'active' : ''}`} 
              onClick={() => toggleFaq(5)}
            >
              <h3>¿Cómo puedo optimizar los rendimientos?</h3>
              <span className="faq-toggle">{expandedFaqs[5] ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${expandedFaqs[5] ? 'expanded' : ''}`}>
              <p>Para optimizar los rendimientos de cultivos:</p>
              <ol>
                <li><strong>Análisis de suelo:</strong> Realizar pruebas regulares para determinar necesidades específicas de nutrientes.</li>
                <li><strong>Selección de semillas:</strong> Utilizar variedades adaptadas a las condiciones locales y resistentes a enfermedades.</li>
                <li><strong>Manejo de nutrientes:</strong> Aplicar fertilizantes de manera precisa según requerimientos específicos del cultivo.</li>
                <li><strong>Control integrado de plagas:</strong> Combinar métodos químicos, biológicos y culturales.</li>
                <li><strong>Tecnología de precisión:</strong> Implementar sistemas de monitoreo y aplicación variable.</li>
                <li><strong>Rotación de cultivos:</strong> Alternar especies para romper ciclos de plagas y mejorar la salud del suelo.</li>
                <li><strong>Gestión del agua:</strong> Optimizar sistemas de riego y drenaje según necesidades hídricas.</li>
              </ol>
              <p>Una estrategia integrada que combine estas prácticas permite maximizar productividad y sostenibilidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿LISTO PARA IMPULSAR TU NEGOCIO?</h2>
          <p>Contáctanos hoy mismo y comienza a vender en línea con una tienda profesional</p>
          <button className="cta-button">SOLICITAR PRESUPUESTO</button>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home0;