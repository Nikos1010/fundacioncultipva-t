import "./index.css";
import proyectoImage from "../../../assets/proyecto.webp";

const information = [
  {
    key: 0,
    title: "Jóvenes no adoptados",
    info: "Los huérfanos no adoptados mayores de 15 años, internos en el sistema de protección del Estado, fueron nuestra inspiración para el desarrollo de la visión. Hoy consideramos, que aun los que conviven con sus padres, o familiares cercanos, pero ausentes, deben ser incluidos desde los 12 años.",
    link: "http://www.youtube.com/embed/jtDVX_aEy7o",
  },
  {
    key: 1,
    title: "Familias Saludables",
    info: "Este programa apunta al desarrollo de familias que han perdido el concepto como originalmente Dios las creó y necesitan ser restauradas; saludables en todas las áreas emocional-afectivo, física y espiritual. Enseñar, orientar y acompañar a los padres en la responsabilidad que ellos tienen de educar y formar el carácter en sus hijos con ejemplo y principios desde el hogar.",
    link: "http://www.youtube.com/embed/oWnRmZ7KoKc",
  },
  {
    key: 2,
    title: "Proyectos de Emprendimiento y Autosostenibilidad",
    info: "Hoy se ha perdido el concepto original del trabajo, el ser humano fue puesto para administrar, sojuzgar y co crear, es necesario restaurar este concepto, inspirar, enseñar y promover el emprendimiento de proyectos, conlleva a recobrar identidad y propósito; parte del proceso de los jóvenes y familias es que descubran sus dones y talentos, desarrollen sus habilidades y descubran el propósito por el cual están en esta tierra.",
    link: proyectoImage,
  },
];

function ProgramCard() {
  return (
    <>
      {information.map((item, index) => (
        <section key={item.key} className="card programCard">
          <div className="content">
            <h2>{item.title}</h2>
            <p>{item.info}</p>
          </div>
          {index != 2 ? (
            <iframe
              width="400"
              height="240"
              src={item.link}
              autoPlay
              controls></iframe>
          ) : (
            <img src={item.link} width="350" />
          )}
        </section>
      ))}
    </>
  );
}
export default ProgramCard;
