import React, { useState } from "react";
import "./Home0.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

// import "./home.css";

const Home0 = () => {
  // Estado para controlar qué preguntas del FAQ están expandidas
  const [expandedFaqs, setExpandedFaqs] = useState({});

  // Función para manejar la expansión/contracción de las preguntas del FAQ
  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="home-container">
        {/*----------------------------                     "Hero"  Section                 --------------------------------------- */}

        <section className="hero-section">
          <div className="hero-content">
            {/* <div className="logo_father">
              <div className="logo"></div>
            </div> */}
            <h1>What To Farm</h1>
            {/* <h2>Datos en tiempo real para decisiones agrícolas</h2> */}
            <p className="mb-5">
              Datos en tiempo real para decisiones agrícolas
            </p>
          </div>
        </section>
        <div className="btn_gr_father">
          <div className="btn_father">
            <button className="cta-button ">Suscribirse ahora</button>
          </div>
        </div>

        {/*----------------------------                 Nuestros servicios"  Section                 --------------------------------- */}

        <section className="services-section" id="Servicios">
          <div className="section-title">
            <h2>Nuestros servicios</h2>
            <div className="title-divider"></div>
          </div>
          <div className="services-container">
            <div className="service-card">
              <div className="service-icon">
                <img src="/public/img/calculator.png" alt="" />
              </div>
              <h3>Calculadora de margenes</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                eum quos commodi repudiandae aspernatur rem totam error beatae,
                alias maxime libero cum assumenda maiores minus excepturi saepe
                sint voluptatibus labore.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/public/img/chart.png" alt="" />
              </div>
              <h3>Precios de commodities e insumos en tiempo real </h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                eum quos commodi repudiandae aspernatur rem totam error beatae,
                alias maxime libero cum assumenda maiores minus excepturi saepe
                sint voluptatibus labore.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/public/img/trigo.png" alt="" />
              </div>
              <h3>Indicadores commericales y productivos </h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                eum quos commodi repudiandae aspernatur rem totam error beatae,
                alias maxime libero cum assumenda maiores minus excepturi saepe
                sint voluptatibus labore.
              </p>
            </div>
          </div>
        </section>

        {/*----------------------------                     " Parallax"  Section                 --------------------------------------- */}

        <section className="parallax-section">
          <div className="parallax-content">
            <div>
              <h2>
                Aprovechá todo <span>nuestro potencial</span>
              </h2>
              <p>
                Para customizar todos tus costos e insumos y obtener tus
                márgenes más exactos, contrata la membresía.
              </p>
            </div>
            <div className="h">
              <Link to={`/login`}>
                <div className="btn_gr_father2">
                  <div className="btn_father2">
                    <button className="cta-button ">Login</button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* -----------------------             Crop Costs Section                ------------------------*/}

        <section className="crop-costs-section">
          <div className="section-title">
            <h2>Analisis de margenes de cultivos </h2>
            <div className="title-divider"></div>
          </div>
          <div className="crops-container">
            {/* Maíz */}
            <div className="crop-card">
              <h3 className="crop-title">Maíz</h3>
              <div className="crop-data">
                <div className="crop-row">
                  <span className="crop-label">Precio del grano</span>
                  <span className="crop-value">210</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Rinde</span>
                  <span className="crop-value">8.0</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Ingreso</span>
                  <span className="crop-value">1550</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Costo Arrendamiento</span>
                  <span className="crop-value">380</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Costo Insumos</span>
                  <span className="crop-value">1150</span>
                </div>
              </div>
              <div className="margin-container">
                <div className="margin-label">
                  <span>Margen</span>
                  <span>Bruto</span>
                </div>
                <div className="margin-value">220</div>
              </div>
            </div>

            {/*  ----------           Soja             --------------*/}

            <div className="crop-card">
              <h3 className="crop-title">Soja</h3>
              <div className="crop-data">
                <div className="crop-row">
                  <span className="crop-label">Precio del grano</span>
                  <span className="crop-value">370</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Rinde</span>
                  <span className="crop-value">2.3</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Ingreso</span>
                  <span className="crop-value">760</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Costo Arrendamiento</span>
                  <span className="crop-value">330</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Costo Insumos</span>
                  <span className="crop-value">460</span>
                </div>
              </div>
              <div className="margin-container">
                <div className="margin-label">
                  <span>Margen</span>
                  <span>Bruto</span>
                </div>
                <div className="margin-value">280</div>
              </div>
            </div>

            {/*----------------             Trigo        --------------------- */}

            <div className="crop-card">
              <h3 className="crop-title">Trigo</h3>
              <div className="crop-data">
                <div className="crop-row">
                  <span className="crop-label">Precio del grano</span>
                  <span className="crop-value">175</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Rinde</span>
                  <span className="crop-value">4</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Ingreso</span>
                  <span className="crop-value">645</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Costo Arrendamiento</span>
                  <span className="crop-value">228</span>
                </div>
                <div className="crop-row">
                  <span className="crop-label">Costo Insumos</span>
                  <span className="crop-value">560</span>
                </div>
              </div>
              <div className="margin-container">
                <div className="margin-label">
                  <span>Margen</span>
                  <span>Bruto</span>
                </div>
                <div className="margin-value">185</div>
              </div>
            </div>
          </div>
        </section>

        {/* /*----------------------------                     "Por que elegirnos"  Section                 --------------------------------------- */}

        <section className="features-section">
          <div className="section-title light">
            <h2>¿Por que elegirnos?</h2>
            <div className="title-divider2 light"></div>
          </div>
          <div className="features-container">
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/public/img/chart.png" alt="" />
              </div>
              <h3>Margenes</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                necessitatibus, minus reiciendis..
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/public/img/trigo.png" alt="" />
              </div>
              <h3> Actualidad</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                necessitatibus, minus reiciendis..
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/public/img/chart.png" alt="" />
              </div>
              <h3>Comunidad</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                necessitatibus, minus reiciendis..
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/public/img/calculator.png" alt="" />
              </div>
              <h3>Otros</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                necessitatibus, minus reiciendis..
              </p>
            </div>
          </div>
        </section>

        {/*-------------------------------                 Process Section                     ------------------------------- */}

        <section className="process-section" id="suscripciones">
          <div className="section-title">
            <h2>Suscripciones</h2>
            <div className="title-divider"></div>
          </div>
          <div className="process-container">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Free</h3>
              <h5> 0 u$s/ mes. </h5>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                repellendus voluptate atque officia pers
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Basic</h3>
              <h5> 2 u$s / mes. </h5>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                repellendus voluptate atque officia pers
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Full</h3>
              <h5>4 u$s / mes. </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                repellendus voluptate atque officia pers
              </p>
            </div>
          </div>
        </section>

        {/* /*----------------------------                     "FAQ"  Section                 --------------------------------------- */}

        <section className="faq-section" id="faq">
          <div className="section-title">
            <h2>Preguntas frecuentes </h2>
            <div className="title-divider"></div>
          </div>
          <div className="faq-container">
            <div className="faq-item">
              <div
                className={`faq-question ${expandedFaqs[1] ? "active" : ""}`}
                onClick={() => toggleFaq(1)}
              >
                <h3>¿Qué es el margen bruto?</h3>
                <span className="faq-toggle">
                  {expandedFaqs[1] ? "-" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${expandedFaqs[1] ? "expanded" : ""}`}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo aliquam dolores, aspernatur sapiente totam
                  voluptatum unde corrupti numquam quisquam maiores dolor
                  dolorem? Reiciendis, at mollitia earum nam voluptate omnis
                  dolorum!
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${expandedFaqs[2] ? "active" : ""}`}
                onClick={() => toggleFaq(2)}
              >
                <h3>¿Cómo calcular el margen bruto?</h3>
                <span className="faq-toggle">
                  {expandedFaqs[2] ? "-" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${expandedFaqs[2] ? "expanded" : ""}`}
              >
                <p>Para calcular el margen bruto en cultivos:</p>
                <ol>
                  <li>
                    Determina el ingreso total (Precio del grano × Rendimiento)
                  </li>
                  <li>
                    Suma todos los costos directos (Arrendamiento + Insumos)
                  </li>
                  <li>Resta los costos directos del ingreso total</li>
                </ol>
                <p>
                  La fórmula es: Margen Bruto = Ingreso Total - (Costo
                  Arrendamiento + Costo Insumos)
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${expandedFaqs[3] ? "active" : ""}`}
                onClick={() => toggleFaq(3)}
              >
                <h3>¿Por qué son importantes estos cultivos?</h3>
                <span className="faq-toggle">
                  {expandedFaqs[3] ? "-" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${expandedFaqs[3] ? "expanded" : ""}`}
              >
                <p>
                  Maíz, soja y trigo son cultivos fundamentales en la
                  agricultura global:
                </p>
                <ul>
                  <li>
                    <strong>Maíz:</strong> Esencial para alimentación humana,
                    animal y producción de biocombustibles.
                  </li>
                  <li>
                    <strong>Soja:</strong> Principal fuente de proteína vegetal
                    y aceite para consumo humano e industrial.
                  </li>
                  <li>
                    <strong>Trigo:</strong> Base de la alimentación humana en
                    muchas regiones, utilizado para harinas y derivados.
                  </li>
                </ul>
                <p>
                  Estos cultivos representan la base de la seguridad alimentaria
                  mundial y son pilares económicos para muchos países agrícolas.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${expandedFaqs[4] ? "active" : ""}`}
                onClick={() => toggleFaq(4)}
              >
                <h3>¿Qué factores afectan los precios de los cultivos?</h3>
                <span className="faq-toggle">
                  {expandedFaqs[4] ? "-" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${expandedFaqs[4] ? "expanded" : ""}`}
              >
                <p>
                  Los precios de los cultivos están influenciados por múltiples
                  factores:
                </p>
                <ul>
                  <li>Oferta y demanda global</li>
                  <li>Condiciones climáticas y desastres naturales</li>
                  <li>Políticas comerciales y aranceles internacionales</li>
                  <li>Niveles de inventario y reservas mundiales</li>
                  <li>Valor del dólar y fluctuaciones de divisas</li>
                  <li>Costos de producción e insumos</li>
                  <li>Especulación en mercados de futuros</li>
                </ul>
                <p>
                  La interacción de estos factores genera la volatilidad
                  característica de los mercados agrícolas.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div
                className={`faq-question ${expandedFaqs[5] ? "active" : ""}`}
                onClick={() => toggleFaq(5)}
              >
                <h3>¿Cómo puedo optimizar los rendimientos?</h3>
                <span className="faq-toggle">
                  {expandedFaqs[5] ? "-" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${expandedFaqs[5] ? "expanded" : ""}`}
              >
                <p>Para optimizar los rendimientos de cultivos:</p>
                <ol>
                  <li>
                    <strong>Análisis de suelo:</strong> Realizar pruebas
                    regulares para determinar necesidades específicas de
                    nutrientes.
                  </li>
                  <li>
                    <strong>Selección de semillas:</strong> Utilizar variedades
                    adaptadas a las condiciones locales y resistentes a
                    enfermedades.
                  </li>
                  <li>
                    <strong>Manejo de nutrientes:</strong> Aplicar fertilizantes
                    de manera precisa según requerimientos específicos del
                    cultivo.
                  </li>
                  <li>
                    <strong>Control integrado de plagas:</strong> Combinar
                    métodos químicos, biológicos y culturales.
                  </li>
                  <li>
                    <strong>Tecnología de precisión:</strong> Implementar
                    sistemas de monitoreo y aplicación variable.
                  </li>
                  <li>
                    <strong>Rotación de cultivos:</strong> Alternar especies
                    para romper ciclos de plagas y mejorar la salud del suelo.
                  </li>
                  <li>
                    <strong>Gestión del agua:</strong> Optimizar sistemas de
                    riego y drenaje según necesidades hídricas.
                  </li>
                </ol>
                <p>
                  Una estrategia integrada que combine estas prácticas permite
                  maximizar productividad y sostenibilidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>¿Listo para impulsar tu negocio?</h2>
            <p>
              Contáctanos hoy mismo y comienza a vender en línea con una tienda
              profesional
            </p>
            <button className="cta-button">Solicitar Presupuesto</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home0;
