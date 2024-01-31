import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/clients';
import { ConfigProvider } from 'antd';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <div className='App'>
          <Clients />
        </div>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;
