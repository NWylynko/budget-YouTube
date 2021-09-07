import styled from "styled-components";
import { useApi, axios } from "../../ClientApi";
import { Button } from "../Styles/Button";

interface User {
  userId: string;
  userName: string;
  email: string;
  profilePicId: string;
}

interface SelectDemoUserProps {
  onClick: (userId: string) => void;
}

export const SelectDemoUser = ({ onClick }: SelectDemoUserProps) => {
  const { data: users } = useApi<User[]>("/user/getAll");

  const onResetDatabase = async () => {
    console.log(await axios.post('/database/reset'));
    location.reload();
  }

  return (
    <Container>
      <h2>Select Demo User</h2>
      {users ? (
        users.map((user) => (
          <User key={user.userId} onClick={() => {
            onClick(user.userId);
          }} >
            <div>
              <Image alt="user profile pic" src={`/api/image/get?imageId=${user.profilePicId}&height=64&width=64&format=webp`} height={64} width={64} />
            </div>
            <Details>
              <h4>{user.userName}</h4>
              <span>{user.email}</span>
            </Details>
          </User>
        ))
      ) : (
        <span>Loading users...</span>
      )}
      <Button onClick={onResetDatabase}>Reset Database</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const User = styled.button`
  display: flex;
  flex-direction: row;
  margin: 8px;
  padding: 8px;
  justify-content: start;
  width: 80%;
  max-width: 300px;
  border: 2px dashed black;
  border-radius: 8px;
  background-color: white;

  &:hover {
    background-color: #ececec;
    border-style: solid;
  }
`;

const Image = styled.img`
  border-radius: 50%;
  margin: 8px;
  padding: 8px;
`;

const Details = styled.div`
  margin: 8px;
  padding: 8px;
`;
