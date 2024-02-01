import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </ConfigProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
