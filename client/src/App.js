import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ClientsList from './Pages/ClientsList';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import ProjectDetails from './Pages/ProjectDetails';
import ProjectsList from './Pages/ProjectsList';
import Container from './Sidebar';

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
  uri: 'https://user-client-mgmt.onrender.com/graphql',
  cache,
});

function App() {
  return (
    <div className='App' style={{ minHeight: '100vh' }}>
      <ApolloProvider client={client}>
        <Router>
          <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
            <Container>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<ProjectsList />} />
                <Route path='/clients' element={<ClientsList />} />
                <Route path='/project/:id' element={<ProjectDetails />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </ConfigProvider>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
