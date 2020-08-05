import React, { Component } from 'react';
import '../../CSS/blog/Show.css';
import Paging from './Paging';

const images = require.context('../../assets/img', true);

class ShowArticle extends Component {
  state = {
    articles: [
      {
        id: 1,
        title: '1000 TShirts',
        thumb: 'denim-jacket.jpg',
        meta: '50% discount Buy now',
        detailed: {
          image: 'denim-jacket.jpg',
          text:
            'T shirts made of high quality t shirts.'
        }
      },
      {
        id: 2,
        title: '1000 Kurta',
        thumb: 'kurta.jpeg',
        meta: '50% discount Buy now',
        detailed: {
          image: 'kurta.jpeg',
          text:
            'Kurta made of high quality t shirts.'
        }
      },
      {
        id: 3,
        title: 'Beet Season',
        thumb: 'vegetable.jpg',
        meta: 'MICHELLE LIV ∙ OCTOMBER 15, 2015',
        detailed: {
          image: 'vegetable-big.jpg',
          text:
            'Duis ornare placerat molestie. Etiam volutpat nisl quis leo tincidunt, a hendrerit felis convallis. Sed tempus orci id faucibus auctor. Morbi consequat nulla quis volutpat varius. Integer id placerat metus. Etiam quis felis nec lorem vehicula pellentesque. Ut vitae venenatis dolor. Proin condimentum massa sit amet augue laoreet, vel tincidunt nunc elementum. Sed feugiat faucibus libero sed blandit. Vivamus molestie, odio nec lobortis dignissim, augue elit sodales elit, nec mattis velit massa eget augue. Proin eleifend nisi ut mi aliquet rutrum. Nulla et luctus massa, quis maximus ligula. Donec vitae cursus lectus. Etiam viverra velit at dolor vehicula vehicula.  Fusce vestibulum nulla at lorem venenatis, vel porta mauris ultricies. Sed tempor ipsum eros, sit amet euismod est sollicitudin at. Curabitur eu erat non nisi semper mollis ac et orci. Fusce vel eros id turpis posuere placerat. Vestibulum at aliquam lorem, sed egestas urna. Cras sed volutpat elit. Vivamus nunc purus, ullamcorper in condimentum quis, pellentesque at ipsum. Aliquam suscipit dolor vitae velit pellentesque volutpat. Nam vel tempus nunc. Curabitur orci neque, vestibulum non ipsum sit amet, pretium fermentum eros. Fusce elit metus, tempus et nisi eget, viverra dapibus libero. Vestibulum rhoncus eros nunc, ac molestie dui fringilla sit amet.'
        }
      },
      {
        id: 4,
        title: 'Banh Mi + Do Chua',
        thumb: 'wrap.jpg',
        meta: 'MICHELLE LIV ∙ SEPTEMBER 30, 2015',
        detailed: {
          text:
            'Quisque egestas lacus ut sem ultricies, eget vulputate turpis fermentum. Praesent lobortis finibus dui, vitae commodo nulla gravida sit amet. Donec a ultrices ex. Suspendisse luctus in leo quis sollicitudin. Etiam dolor enim, pellentesque nec tincidunt vitae, laoreet sit amet tortor. Duis nec sagittis arcu. Suspendisse id sem sodales, gravida urna vel, sollicitudin orci. Nullam non facilisis neque, vitae laoreet turpis. Duis a ipsum velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum eget mi gravida, ullamcorper ligula at, laoreet enim. Nullam sem mi, mattis vitae fermentum eget, semper non lorem. Donec vehicula quam non tincidunt pretium. Vivamus mi nisl, condimentum nec velit vitae, consequat elementum felis. Fusce eget sollicitudin nunc. Nunc in gravida lacus.',
          image: 'wrap1.jpg',
          text:
            'Phasellus eget lacinia nisl. Nullam lorem lacus, mollis vitae ligula quis, imperdiet imperdiet purus. Phasellus tempor metus in lorem rhoncus, eget pellentesque lectus interdum. Aenean pellentesque, est et vehicula posuere, ligula tellus lobortis tellus, at convallis orci elit at nunc. Pellentesque semper tortor vitae mi feugiat, sit amet volutpat lorem luctus. Quisque pharetra enim sit amet varius accumsan. Vivamus finibus vitae sapien ac efficitur. Donec non eros sed lorem laoreet tincidunt. Quisque id dolor luctus, ornare quam eu, maximus diam. Cras non iaculis ex. Morbi euismod faucibus commodo. Nullam vitae pellentesque dolor. Integer ornare, elit ac tristique imperdiet, arcu massa convallis nunc, vulputate vestibulum tellus velit non mauris. Mauris non dolor nulla. Cras est nulla, varius vitae bibendum sed, pharetra non turpis. Nunc id sollicitudin odio, nec blandit massa.'
        }
      },
      {
        id: 5,
        title: 'Cabbage',
        thumb: 'sprout.jpg',
        meta: 'MICHELLE LIV ∙ SEPTEMBER 14, 2015',
        detailed: {
          image: 'sprout-big.jpg',
          text:
            'Nulla volutpat, erat ac blandit imperdiet, est lacus egestas ex, sit amet lacinia risus ante a lorem. Ut elementum, velit non luctus aliquam, nibh odio molestie lectus, id faucibus felis augue id mauris. Sed porta posuere fringilla. Donec feugiat risus sit amet tortor venenatis, non venenatis nisl bibendum. Etiam at mauris augue. Donec tempus ex a feugiat eleifend. Nulla facilisi. Quisque non tincidunt est. Sed sed gravida sem. Pellentesque sed ipsum dolor. Vestibulum tempus semper libero vitae fermentum. Proin ultrices accumsan enim sed aliquam. In at ipsum turpis. Sed sit amet ligula vel est dapibus accumsan ut vel libero. Proin placerat nunc non ex aliquet dapibus. Aliquam ut ex justo. Curabitur hendrerit justo eu purus pharetra, eu posuere dolor rhoncus. Curabitur eu vulputate velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur aliquet ullamcorper porttitor. Aenean venenatis mattis sodales. Sed viverra nunc ac purus vulputate tincidunt. Suspendisse potenti. Morbi laoreet sem vitae dictum egestas. Ut a consectetur ligula, at mattis tortor. Maecenas cursus porta felis, quis egestas tellus elementum nec. Proin vitae orci quis mauris dictum lacinia id ut nibh. Proin dictum malesuada nunc, nec tempor est pulvinar ut. Morbi fringilla sodales pulvinar. Etiam eu orci a neque eleifend egestas sit amet eget eros.'
        }
      },
      {
        id: 6,
        title: 'Classic Dill',
        thumb: 'cucember.jpg',
        meta: 'MICHELLE LIV ∙ MAY 19, 2015',
        detailed: {
          image: 'cucumbers-big.jpg',
          text:
            'Praesent sit amet elementum sapien, non sollicitudin nunc. Aenean tincidunt eu massa vel convallis. Nam vitae purus tristique, dapibus justo vel, ultrices sapien. Curabitur congue ultrices ligula, quis fringilla justo tincidunt ultrices. Nullam ac quam sapien. Fusce et mauris et sapien elementum pellentesque sit amet ac felis. Praesent fermentum dui non est maximus efficitur. Sed efficitur sit amet ligula id molestie. Cras sodales ex eu ante efficitur, in mollis turpis bibendum. In mollis orci ut lorem lobortis blandit. Proin eget odio nec augue semper aliquet. In metus ex, imperdiet nec ornare at, ornare vel mi. Cras elementum gravida nunc, at feugiat eros interdum non. Curabitur vel leo sed diam consectetur convallis. Sed tempus pretium augue, sodales maximus enim porta eu. Donec egestas neque quis molestie tincidunt. Donec posuere faucibus libero, vel malesuada est egestas quis. Vestibulum ante dolor, bibendum faucibus blandit id, tristique a leo. Suspendisse ligula lorem, rhoncus id ultrices at, ornare eu metus. Nullam porttitor varius posuere. Mauris pellentesque augue urna, lacinia efficitur felis varius sit amet. Suspendisse commodo felis sit amet risus auctor, sagittis lacinia sapien finibus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras pharetra ligula vitae odio eleifend suscipit. Vivamus ut libero dictum, mollis augue nec, ullamcorper leo. Duis a justo ut mi elementum accumsan. Integer ante turpis, pulvinar et eleifend ut, placerat non odio. Maecenas porttitor, est in molestie porta, ligula ex vestibulum nisi, quis aliquam lectus quam non lib'
        }
      },
      {
        id: 7,
        title: 'Bratwurst + Sauerkraut Soup',
        thumb: 'soup.jpg',
        meta: 'MICHELLE LIV ∙ FEBRUARY 10, 2015',
        detailed: {
          image: 'soup-big.jpg',
          text:
            'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.Aenean volutpat venenatis sem nec posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur fermentum quis velit non posuere. Maecenas vestibulum auctor sapien id elementum. Sed eget dui nulla. Ut bibendum ultrices tincidunt. Donec at tempus purus!'
        }
      },
      {
        id: 8,
        title: 'Red Hot',
        thumb: 'pepper.jpg',
        meta: 'MICHELLE LIV ∙ NOVEMBER 1, 2015',
        detailed: {
          image: 'peppers-big.jpg',
          text:
            'Nulla volutpat, erat ac blandit imperdiet, est lacus egestas ex, sit amet lacinia risus ante a lorem. Ut elementum, velit non luctus aliquam, nibh odio molestie lectus, id faucibus felis augue id mauris. Sed porta posuere fringilla. Donec feugiat risus sit amet tortor venenatis, non venenatis nisl bibendum. Etiam at mauris augue. Donec tempus ex a feugiat eleifend. Nulla facilisi. Quisque non tincidunt est. Sed sed gravida sem. Pellentesque sed ipsum dolor. Vestibulum tempus semper libero vitae fermentum. Proin ultrices accumsan enim sed aliquam. In at ipsum turpis. Sed sit amet ligula vel est dapibus accumsan ut vel libero.Proin placerat nunc non ex aliquet dapibus. Aliquam ut ex justo. Curabitur hendrerit justo eu purus pharetra, eu posuere dolor rhoncus. Curabitur eu vulputate velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur aliquet ullamcorper porttitor. Aenean venenatis mattis sodales. Sed viverra nunc ac purus vulputate tincidunt. Suspendisse potenti. Morbi laoreet sem vitae dictum egestas. Ut a consectetur ligula, at mattis tortor. Maecenas cursus porta felis, quis egestas tellus elementum nec. Proin vitae orci quis mauris dictum lacinia id ut nibh. Proin dictum malesuada nunc, nec tempor est pulvinar ut. Morbi fringilla sodales pulvinar. Etiam eu orci a neque eleifend egestas sit amet eget eros.'
        }
      }
    ],
    article: {}
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let article = null;
    for (let param of query.entries()) {
      article = this.state.articles.find(el => el.id === +param[1]);
    }

    this.setState({ article: article });
  }

  nextPageHandler = () => {
    const articles = {
      ...this.state.articles
    };

    const currentIndex = Object.keys(articles).find(el => {
      return articles[el].id === this.state.article['id'];
    });

    const nextIndex = parseInt(currentIndex) + 1;

    if (articles[nextIndex]) {
      this.props.history.push({
        pathname: 'article',
        search: '?id=' + articles[nextIndex].id
      });

      this.setState({ article: articles[nextIndex] });
    }
  };

  prevPageHandler = () => {
    const articles = {
      ...this.state.articles
    };

    const currentIndex = Object.keys(articles).find(el => {
      return articles[el].id === this.state.article['id'];
    });

    const nextIndex = parseInt(currentIndex) - 1;

    if (articles[nextIndex]) {
      this.props.history.push({
        pathname: 'article',
        search: '?id=' + articles[nextIndex].id
      });

      this.setState({ article: articles[nextIndex] });
    }
  };

  render() {
    let img = images('./' + this.state.article['detailed']['image']);
    return (
      <>
        <div className="article">
          <div className="article__inner">
            <div className="article__meta">{this.state.article['meta']}</div>
            <h1 className="article__title">{this.state.article['title']}</h1>
            <div className="article__image">
              <img src={img} alt={this.state.article['title']} />
            </div>
            <div className="article__text">
              {this.state.article['detailed']['text']}
            </div>
          </div>
        </div>
        <Paging next={this.nextPageHandler} prev={this.prevPageHandler} />
      </>
    );
  }
}

export default ShowArticle;
