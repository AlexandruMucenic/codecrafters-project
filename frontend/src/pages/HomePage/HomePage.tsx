import React from 'react'
import './HomePage.css'
import Carousel from '../../components/Carousel/Carousel'
import Dostoevsky from '../../images/author/Dostoevsky.jpg'

const HomePage: React.FC = () => {
  return (
    <div className="homePageContainer">
      {/*Carousel section*/}
      <Carousel />

      {/*Quote section*/}
      <div className="quoteContainer">
        <p>
          &ldquo;Above all, don&apos;t lie to yourself. The man who lies to himself and listens to his own lie comes to
          a point that he cannot distinguish the truth within him, or around him, and so loses all respect for himself
          and for others. And having no respect he ceases to love.&rdquo;
        </p>
        <h4>Fyodor Dostoevsky, The Brothers Karamazov</h4>
      </div>

      {/*Author section*/}
      <div className="authorContainer">
        <div className="imageContainer">
          <img className="authorImage" alt="author picture" src={Dostoevsky} />
        </div>
        <div className="authorText">
          <h3 className="authorTitle">Author of the Month</h3>
          <p>
            Fyodor Mikhailovich Dostoevsky (11 November 1821 – 9 February 1881), sometimes transliterated as
            Dostoyevsky, was a Russian novelist, short story writer, essayist and journalist.
          </p>
          <p>
            Dostoevsky&apos;s literary works explore the human condition in the troubled political, social, and
            spiritual atmospheres of 19th-century Russia, and engage with a variety of philosophical and religious
            themes. His most acclaimed novels include <em>Crime and Punishment</em> (1866), <em>The Idiot</em> (1869),{' '}
            <em>Demons</em> (1872), and <em>The Brothers Karamazov</em> (1880).
          </p>
          <p>
            Numerous literary critics rate him as one of the greatest novelists in all of world literature, as many of
            his works are considered highly influential masterpieces. Dostoevsky was influenced by a wide variety of
            philosophers and authors including Pushkin, Gogol, Augustine, Shakespeare, Dickens, Balzac, Lermontov,
            Plato, Cervantes, Kant, Byron and Hegel. Dostoevsky&apos;s body of work consists of 12 novels, four
            novellas, 16 short stories, and numerous other works. His writings influenced an equally great number of
            later writers including Russians such as Aleksandr Solzhenitsyn and Anton Chekhov, philosophers Friedrich
            Nietzsche and Jean-Paul Sartre, and the emergence of Existentialism and Freudianism.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
