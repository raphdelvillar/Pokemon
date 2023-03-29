import { fetchPokemons, fetchOnePokemon } from "./api";
import { useEffect, useState } from "react";
import { Typography, Col, Row, Button } from "antd";
import PokemonDetails from "./pokemon-details";
import { PokemonStatistics } from "./pokemon-statistics";

const { Title } = Typography;

const FRONT = "front_default";

export default function Pokemon() {
  const [offset, setOffset] = useState(0);
  const [maxRandom, setMaxRandom] = useState(30);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [officialArtWork, setOfficialArtWork] = useState("");

  useEffect(() => {
    async function retrievePokemonDetails() {
      let fetchPokemonsData = await fetchPokemons(offset, 1);
      let pokemonsList = fetchPokemonsData.data.results;

      setMaxRandom(fetchPokemonsData.data.count);

      let fetchPokemonData = await fetchOnePokemon(pokemonsList[0].name);
      let pokemon = fetchPokemonData.data;

      setPokemonDetails(pokemon)
      setPokemonSprite(pokemon?.sprites[FRONT]);
      setOfficialArtWork(pokemon?.sprites?.other["official-artwork"][FRONT]);
    }

    retrievePokemonDetails();
  }, [offset])

  const capitalize = (text) => {
    if (text == null) return '';
    return `${text?.charAt(0).toUpperCase()}${text?.slice(1)}`;
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <img src={officialArtWork} className="Pokemon-official-art-work" alt="pokemon-official-art-work" />
        </Col>
        <Col span={24}>
          <Title level={2}>{capitalize(pokemonDetails?.name)}</Title>
          <img src={pokemonSprite} className="Pokemon-sprite" alt="pokemon-sprite" />
        </Col>
        <br/><br/>
        <PokemonDetails pokemonDetails={pokemonDetails}/>
      </Row>
      <br />
      <PokemonStatistics pokemonDetails={pokemonDetails} />
      <br />
      <Row gutter={100}>
        <Col span={8}>
          <Button disabled={offset === 0} onClick={() => setOffset(offset - 1)} size="large">Previous</Button>
        </Col>
        <Col span={8}>
          <Button onClick={() => setOffset(Math.floor(Math.random() * maxRandom))} size="large">Random</Button>
        </Col>
        <Col span={8}>
          <Button onClick={() => setOffset(offset + 1)} type="primary" size="large">Next</Button>
        </Col>
      </Row>
    </div>
  )
}
