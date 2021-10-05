import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import MovieDetail from './components/MovieDetail/MovieDetail';

function App() {
    return (
        <div className='App'>
            <Router>
                <Header />
                <div className='container'>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/movie/:imdbID' exact component={MovieDetail} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
