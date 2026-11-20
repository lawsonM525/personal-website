import styles from "./explore.module.css"

export function MachineStopsDocument() {
  return (
    <article className={styles.readingDocument} aria-labelledby="machine-stops-title">
      <h1 id="machine-stops-title">The Machine Stops</h1>
      <blockquote>
        <p>{`“The Machine,” they exclaimed,
“feeds us and clothes us and houses us;
through it we speak to one another,
through it we see one another,
in it we have our being.`}</p>
        <p>{`The Machine is the friend of ideas and the enemy of superstition:
the Machine is omnipotent, eternal;
blessed is the Machine.”`}</p>
      </blockquote>
      <p className={styles.readingDocumentCredit}>E. M. Forster, <cite>The Machine Stops</cite> (1909), Part III, “The Homeless.”</p>
    </article>
  )
}
