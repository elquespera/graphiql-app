import { ApiUrlInfo } from '@/types/types';

export const API_URLS: ApiUrlInfo[] = [
  {
    id: 1,
    url: 'https://graphqlpokemon.favware.tech',
    exampleQuery: `fragment data on Pokemon {
  num
  species
  types
  abilities { first second hidden }
  baseStats { hp attack defense specialattack specialdefense speed }
  gender { male female }
  height
  weight
  flavorTexts { game flavor }
  evYields { hp attack defense specialattack specialdefense speed }
  isEggObtainable
  minimumHatchTime
  maximumHatchTime
  levellingRate
  sprite
  shinySprite
  backSprite
  shinyBackSprite
  smogonTier
  smogonPage
  serebiiPage
  bulbapediaPage
}
  
  query($pokemon: PokemonEnum! $reverse: Boolean! $take: Int!) {
  getPokemon(pokemon: $pokemon reverseFlavorTexts: $reverse takeFlavorTexts: $take) {
    ...data
  }
}`,
    exampleVariables: `{
  "pokemon": "arceus",
  "reverse": true,
  "take": 1
}`,
  },
  {
    id: 2,
    url: 'https://spacex-production.up.railway.app',
    exampleQuery: `{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }

    links {
      article_link
      video_link
    }

    rocket {
      rocket_name
    }
  }
}`,
  },
  {
    id: 3,
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    exampleQuery: `query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}`,
  },
  {
    id: 4,
    url: 'https://rickandmortyapi.com/graphql',
    exampleQuery: `{
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }

    results {
      name
    }
  }
}`,
  },
  {
    id: 5,
    url: 'https://countries.trevorblades.com/graphql',
    exampleQuery: `{
  countries {
    code
    name
    emoji
  }
}`,
  },
  {
    id: 6,
    url: 'https://graphql.anilist.co',
    exampleQuery: `{
  Page {
    media {
      siteUrl
      title {
        english
        native
      }
      description
    }
  }
}`,
  },
];

export const DEFAULT_API_URL = API_URLS[0];
