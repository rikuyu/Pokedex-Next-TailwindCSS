import Layout from "../components/Layout";
import Link from "next/link";
export default function Home({ pokemon }) {
  console.log(pokemon);
  return (
    <Layout title="Pokemon図鑑">
      <h1 className="text-4xl mb-8 text-center text-white font-bold">
        ポケモン図鑑
      </h1>
      <ul className="grid grid-cols-3 gap-2">
        {pokemon.map((pokemon, index) => {
          return (
            <li key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className="border p-4 border-gray mb-1 capitalize flex flex-col items-center text-lg bg-white rounded-md">
                  <img
                    className="w-24 h-24"
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                  <div>
                    <span className="mr-4 font-bold">{index + 1}</span>
                    {pokemon.name}
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      const num = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
      //jsonに画像の情報を付加
      return {
        ...result,
        image,
      };
    });

    return {
      props: { pokemon },
    };
  } catch (err) {
    console.log(err);
  }
}
