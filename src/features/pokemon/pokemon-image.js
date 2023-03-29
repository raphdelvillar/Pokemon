import { Col, Typography } from "antd";

const { Title } = Typography;

export default function PokemonImage({ pokemonOfficialArtWork, pokemonSprite, pokemonDetails}) {
  const capitalize = (text) => {
    if (text == null) return '';
    return `${text?.charAt(0).toUpperCase()}${text?.slice(1)}`;
  }

  return (
    <>
      <Col span={24}>
        <img src={pokemonOfficialArtWork} className="Pokemon-official-art-work" alt="pokemon-official-art-work" />
      </Col>
      <Col span={24}>
        <Title level={2}>{capitalize(pokemonDetails?.name)}</Title>
        <img src={pokemonSprite} className="Pokemon-sprite" alt="pokemon-sprite" />
      </Col>
    </>
  )
}
