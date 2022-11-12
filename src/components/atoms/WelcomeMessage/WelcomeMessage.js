// Za pomoca specjalnego propsu children, jestem w stanie przekazac caly html, ktory sie wyrenderuje w elemencie

// props.children jest uzywany w sytuacjach, kiedy nie wiem jaka tresc zostanie wyswietlona np. tresc HTML przychodzi z BE lub renderujemy komponenty dynamiczne typu modal
function WelcomeMessage(props) {
  return (
    <section>
      <h1>{props.children}</h1>
    </section>
  )
}

export default WelcomeMessage