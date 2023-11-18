import { useAppSelector } from "../store/hooks";

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <h1>{`jwt token, ${user}`}</h1>
    </div>
  );
};

export default Home;
