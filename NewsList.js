// NewsList.js

import React from 'react';
import NewsHeader from './NewsHeader.js';
import NewsItem from './NewsItem.js';
import '!style-loader!css-loader!./NewsList.css';

export default class NewsList extends React.Component {
	render() {
 		var data = {
   		"by" : "bane",
   		"descendants" : 49,
   		"id" : 11600137,
   		"kids" : [ 11600476, 11600473, 11600501, 11600463, 11600452, 11600528, 11600421, 11600577, 11600483 ],
   		"score" : 56,
   		"time" : 1461985332,
   		"title" : "Yahoo's Marissa Mayer could get $55M in severance pay",
   		"type" : "story",
   		"url" : "http://www.latimes.com/business/technology/la-fi-0429-tn-marissa-mayer-severance-20160429-story.html"
 	    };
	
		return (
			<div className="NewsList">
				<NewsHeader />
				<div className='newsList-newsItem'>
				{
					(this.props.items).map(function(item, index){
						<NewsItem key={item.id} item={data} rank={index+1} />
					})
					
				}
				</div>
			</div>
		);
	}
}