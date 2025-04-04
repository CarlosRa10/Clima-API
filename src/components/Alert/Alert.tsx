import { ReactNode } from "react";//ReactNode de React, que representa cualquier contenido válido que puede ser renderizado en React (texto, elementos, componentes, etc.)
import styles from "./Alert.module.css";//Importa el archivo CSS para aplicar estilos al componente Alert



//Recibe un prop llamado children de tipo ReactNode, que representa el contenido que se pasará al componente Alert.
//El componente Alert es una función que recibe un prop llamado children y devuelve un elemento <div> que contiene ese contenido.
//{children}: Es un prop especial en React que representa el contenido entre las etiquetas de apertura y cierre del componente
//{children: ReactNode}: Es la anotación de TypeScript que indica que children puede ser cualquier elemento renderizable de React
//Recibe el mensaje ("Por favor complete todos los campos") como children
//Lo muestra dentro de un <div>
export default function Alert({children}: {children: ReactNode}) {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
