import { ListView } from "@/packages/lazarus";
import styled from "styled-components";
import { resource } from "@/packages/lazarus";


export const getServerSideProps = async (context: any) => {
  // console.log(context.req.headers['x-user-info']);
  const Posts = await resource.require("Posts")
  const props = Posts.listViewProps()
  return { props }
}

function Page(props: any) {
  const Container = styled.section`
     display: flex;
     align-items: center;
     justify-content: center;
     padding: 30px 100px;
     @media(max-width: 900px) {
        padding: 30px 20px;
      }
  `;
  return (
    <Container>
      <ListView payload={props} />
    </Container>
  );
}


export default Page;