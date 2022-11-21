import { NextRouter, useRouter  } from "next/router";
import { GetStaticPaths, NextPageContext } from 'next'
import { GetStaticProps, InferGetStaticPropsType } from 'next'


// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { number: "1" } }, { params: { number: "2" } }],
//     fallback: true, // can also be true or 'blocking'
//   };
// }

// type U = {
//   number: string ;
// }

// export const getStaticProps = async (context :any ) => {
//   console.log(context)
//   console.log('here')
//   const tests : U[] = [context.params.number]
//     return {
//       props:{
//         tests
//       }
//     };
// }

function Post( props : any){
  console.log(props )
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  console.log(router.query.number, 'query')
  return (
    <>
      <div>Here</div>
      <div>{router.query.number}</div>
    </>
  );
}

export default Post;
