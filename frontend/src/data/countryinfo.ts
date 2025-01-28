export interface TrendObj { 
  name: string;
  tweet_volume: number;
}

export interface HashObj {
  hashstr: string;
  count: number;
}

export interface CountryInfo {
  name: string,
  code: string,
  woeid: number,
  value: number,
  ppd: number,  // posts per inhabitant per day
  trends: TrendObj[],
  hashtag: HashObj,
}

export const numData: { 
  code: string; 
  value: number; 
  name: string; 
  woeid: number; 
  ppd: number; 
  trends: TrendObj[]; 
  hashtag:HashObj }[] = [
  {
    name: 'Antigua and Barbuda',
    code: 'ATG',
    woeid: 0,
    value: 83039,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ATG',
      count:  1, 
    },
  },
  {
    name: 'Algeria',
    code: 'DZA',
    woeid: 23424740,
    value: 32854159,
    ppd: 0.20,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#DZA',
      count:  1, 
    },
  },
  {
    name: 'Azerbaijan',
    code: 'AZE',
    woeid: 0,
    value: 8352021,
    ppd: 0.27,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AZE',
      count:  1, 
    },
  },
  {
    name: 'Albania',
    code: 'ALB',
    woeid: 0,
    value: 3153731,
    ppd: 0.25,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ALB',
      count:  1, 
    },
  },
  {
    name: 'Armenia',
    code: 'ARM',
    woeid: 0,
    value: 3017661,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ARM',
      count:  1, 
    },
  },
  {
    name: 'Angola',
    code: 'AGO',
    woeid: 0,
    value: 16095214,
    ppd: 0.14,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AGO',
      count:  1, 
    },
  },
  {
    name: 'American Samoa',
    code: 'ASM',
    woeid: 0,
    value: 64051,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ASM',
      count:  1, 
    },
  },
  {
    name: 'Argentina',
    code: 'ARG',
    woeid: 23424747,
    value: 38747148,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ARG',
      count:  1, 
    },
  },
  {
    name: 'Australia',
    code: 'AUS',
    woeid: 23424748,
    value: 20310208,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AUS',
      count:  1, 
    },
  },
  {
    name: 'Bahrain',
    code: 'BHR',
    woeid: 23424753,
    value: 724788,
    ppd: 0.35,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BRB',
      count:  1, 
    },
  },
  {
    name: 'Barbados',
    code: 'BRB',
    woeid: 0,
    value: 291933,
    ppd: 0.27,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BRB',
      count:  1, 
    },
  },
  {
    name: 'Bermuda',
    code: 'BMU',
    woeid: 0,
    value: 64174,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BMU',
      count:  1, 
    },
  },
  {
    name: 'Bahamas',
    code: 'BHS',
    woeid: 0,
    value: 323295,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BHS',
      count:  1, 
    },
  },
  {
    name: 'Bangladesh',
    code: 'BGD',
    woeid: 0,
    value: 15328112,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BGD',
      count:  1, 
    },
  },
  {
    name: 'Belize',
    code: 'BLZ',
    woeid: 0,
    value: 275546,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BLZ',
      count:  1, 
    },
  },
  {
    name: 'Bosnia and Herzegovina',
    code: 'BIH',
    woeid: 0,
    value: 3915238,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BIH',
      count:  1, 
    },
  },
  {
    name: 'Bolivia',
    code: 'BOL',
    woeid: 0,
    value: 9182015,
    ppd: 0.18,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BOL',
      count:  1, 
    },
  },
  {
    name: 'Burma',
    code: 'MMR',
    woeid: 0,
    value: 47967266,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MMR',
      count:  1, 
    },
  },
  {
    name: 'Benin',
    code: 'BEN',
    woeid: 0,
    value: 8490301,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BEN',
      count:  1, 
    },
  },
  {
    name: 'Solomon Islands',
    code: 'SLB',
    woeid: 0,
    value: 472419,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SLB',
      count:  1, 
    },
  },
  {
    name: 'Brazil',
    code: 'BRA',
    woeid: 23424768,
    value: 186830759,
    ppd: 0.35,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BRA',
      count:  1, 
    },
  },
  {
    name: 'Bulgaria',
    code: 'BGR',
    woeid: 0,
    value: 7744591,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BGR',
      count:  1, 
    },
  },
  {
    name: 'Brunei Darussalam',
    code: 'BRN',
    woeid: 0,
    value: 373831,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BRN',
      count:  1, 
    },
  },
  {
    name: 'Canada',
    code: 'CAN',
    woeid: 23424775,
    value: 32270507,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CAN',
      count:  1, 
    },
  },
  {
    name: 'Cambodia',
    code: 'KHM',
    woeid: 0,
    value: 13955507,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KHM',
      count:  1, 
    },
  },
  {
    name: 'Sri Lanka',
    code: 'LKA',
    woeid: 0,
    value: 19120763,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LKA',
      count:  1, 
    },
  },
  {
    name: 'Congo',
    code: 'COG',
    woeid: 0,
    value: 3609851,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#COG',
      count:  1, 
    },
  },
  {
    name: 'Democratic Republic of the Congo',
    code: 'COD',
    woeid: 0,
    value: 58740547,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#COD',
      count:  1, 
    },
  },
  {
    name: 'Burundi',
    code: 'BDI',
    woeid: 0,
    value: 7858791,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BDI',
      count:  1, 
    },
  },
  {
    name: 'China',
    code: 'CHN',
    woeid: 0,
    value: 1312978855,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CHN',
      count:  1, 
    },
  },
  {
    name: 'Afghanistan',
    code: 'AFG',
    woeid: 0,
    value: 25067407,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AFG',
      count:  1, 
    },
  },
  {
    name: 'Bhutan',
    code: 'BTN',
    woeid: 0,
    value: 637013,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BTN',
      count:  1, 
    },
  },
  {
    name: 'Chile',
    code: 'CHL',
    woeid: 23424782,
    value: 16295102,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CHL',
      count:  1, 
    },
  },
  {
    name: 'Cayman Islands',
    code: 'CYM',
    woeid: 0,
    value: 45591,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CYM',
      count:  1, 
    },
  },
  {
    name: 'Cameroon',
    code: 'CMR',
    woeid: 0,
    value: 17795149,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CMR',
      count:  1, 
    },

  },
  {
    name: 'Chad',
    code: 'TCD',
    woeid: 0,
    value: 10145609,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TCD',
      count:  1, 
    },
  },
  {
    name: 'Comoros',
    code: 'COM',
    woeid: 0,
    value: 797902,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#COM',
      count:  1, 
    },
  },
  {
    name: 'Colombia',
    code: 'COL',
    woeid: 23424787,
    value: 4494579,
    ppd: 0.32,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#COL',
      count:  1, 
    },
  },
  {
    name: 'Costa Rica',
    code: 'CRI',
    woeid: 0,
    value: 4327228,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CRI',
      count:  1, 
    },
  },
  {
    name: 'Central African Republic',
    code: 'CAF',
    woeid: 0,
    value: 4191429,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CAF',
      count:  1, 
    },
  },
  {
    name: 'Cuba',
    code: 'CUB',
    woeid: 0,
    value: 11259905,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CUB',
      count:  1, 
    },
  },
  {
    name: 'Cape Verde',
    code: 'CPV',
    woeid: 0,
    value: 506807,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CPV',
      count:  1, 
    },
  },
  {
    name: 'Cook Islands',
    code: 'COK',
    woeid: 0,
    value: 13984,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#COK',
      count:  1, 
    },
  },
  {
    name: 'Cyprus',
    code: 'CYP',
    woeid: 0,
    value: 836321,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CYP',
      count:  1, 
    },
  },
  {
    name: 'Denmark',
    code: 'DNK',
    woeid: 23424796,
    value: 5416945,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#DNK',
      count:  1, 
    },
  },
  {
    name: 'Djibouti',
    code: 'DJI',
    woeid: 0,
    value: 804206,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#DJI',
      count:  1, 
    },
  },
  {
    name: 'Dominica',
    code: 'DMA',
    woeid: 0,
    value: 67827,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#DMA',
      count:  1, 
    },
  },
  {
    name: 'Dominican Republic',
    code: 'DOM',
    woeid: 23424800,
    value: 9469601,
    ppd: 0.33,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#DOM',
      count:  1, 
    },
  },
  {
    name: 'Ecuador',
    code: 'ECU',
    woeid: 23424801,
    value: 13060993,
    ppd: 0.24,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ECU',
      count:  1, 
    },
  },
  {
    name: 'Egypt',
    code: 'EGY',
    woeid: 23424802,
    value: 72849793,
    ppd: 0.25,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#EGY',
      count:  1, 
    },
  },
  {
    name: 'Ireland',
    code: 'IRL',
    woeid: 23424803,
    value: 4143294,
    ppd: 0.29,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IRL',
      count:  1, 
    },
  },
  {
    name: 'Equatorial Guinea',
    code: 'GNQ',
    woeid: 0,
    value: 484098,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GNQ',
      count:  1, 
    },
  },
  {
    name: 'Estonia',
    code: 'EST',
    woeid: 0,
    value: 1344312,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#EST',
      count: 1, 
    },
  },
  {
    name: 'Eritrea',
    code: 'ERI',
    woeid: 0,
    value: 4526722,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ERI',
      count:  1, 
    },
  },
  {
    name: 'El Salvador',
    code: 'SLV',
    woeid: 0,
    value: 6668356,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SLV',
      count:  1, 
    },
  },
  {
    name: 'Ethiopia',
    code: 'ETH',
    woeid: 0,
    value: 78985857,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ETH',
      count:  1, 
    },
  },
  {
    name: 'Austria',
    code: 'AUT',
    woeid: 23424750,
    value: 8291979,
    ppd: 0.29,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AUT',
      count:  1, 
    },
  },
  {
    name: 'Czech Republic',
    code: 'CZE',
    woeid: 0,
    value: 10191762,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CZE',
      count:  1, 
    },
  },
  {
    name: 'French Guiana',
    code: 'GUF',
    woeid: 0,
    value: 192099,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GUF',
      count:  1, 
    },
  },
  {
    name: 'Finland',
    code: 'FIN',
    woeid: 0,
    value: 5246004,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#FIN',
      count:  1, 
    },
  },
  {
    name: 'Fiji',
    code: 'FJI',
    woeid: 0,
    value: 828046,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#FJI',
      count:  1, 
    },
  },
  {
    name: 'Falkland Islands (Malvinas)',
    code: 'FLK',
    woeid: 0,
    value: 2975,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#FLK',
      count:  1, 
    },
  },
  {
    name: 'Federated States of Micronesia',
    code: 'FSM',
    woeid: 0,
    value: 115224,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#FSM',
      count:  1, 
    },
  },
  {
    name: 'French Polynesia',
    code: 'PYF',
    woeid: 0,
    value: 255632,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PYF',
      count:  1, 
    },
  },
  {
    name: 'France',
    code: 'FRA',
    woeid: 23424819,
    value: 60990544,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#FRA',
      count:  1, 
    },
  },
  {
    name: 'Gambia',
    code: 'GMB',
    woeid: 0,
    value: 1617029,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GMB',
      count:  1, 
    },
  },
  {
    name: 'Gabon',
    code: 'GAB',
    woeid: 0,
    value: 1290693,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GAB',
      count:  1, 
    },
  },
  {
    name: 'Georgia',
    code: 'GEO',
    woeid: 0,
    value: 4473409,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GEO',
      count:  1, 
    },
  },
  {
    name: 'Ghana',
    code: 'GHA',
    woeid: 23424824,
    value: 2253501,
    ppd: 0.18,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GHA',
      count:  1, 
    },
  },
  {
    name: 'Grenada',
    code: 'GRD',
    woeid: 0,
    value: 105237,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GRD',
      count:  1, 
    },
  },
  {
    name: 'Greenland',
    code: 'GRL',
    woeid: 0,
    value: 57475,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GRL',
      count:  1, 
    },
  },
  {
    name: 'Germany',
    code: 'DEU',
    woeid: 23424829,
    value: 82652369,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#DEU',
      count:  1, 
    },
  },
  {
    name: 'Guam',
    code: 'GUM',
    woeid: 0,
    value: 16857,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GUM',
      count:  1, 
    },
  },
  {
    name: 'Greece',
    code: 'GRC',
    woeid: 23424833,
    value: 11099737,
    ppd: 0.27,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GRC',
      count:  1, 
    },
  },
  {
    name: 'Guatemala',
    code: 'GTM',
    woeid: 23424834,
    value: 12709564,
    ppd: 0.23,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GTM',
      count:  1, 
    },
  },
  {
    name: 'Guinea',
    code: 'GIN',
    woeid: 0,
    value: 9002656,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GIN',
      count:  1, 
    },
  },
  {
    name: 'Guyana',
    code: 'GUY',
    woeid: 0,
    value: 739472,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GUY',
      count:  1, 
    },
  },
  {
    name: 'Haiti',
    code: 'HTI',
    woeid: 0,
    value: 9296291,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#HTI',
      count:  1, 
    },
  },
  {
    name: 'Honduras',
    code: 'HND',
    woeid: 0,
    value: 683411,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#HND',
      count:  1, 
    },
  },
  {
    name: 'Croatia',
    code: 'HRV',
    woeid: 0,
    value: 3861967,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#HRV',
      count:  1, 
    },
  },
  {
    name: 'Hungary',
    code: 'HUN',
    woeid: 0,
    value: 10086387,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#HUN',
      count:  1, 
    },
  },
  {
    name: 'Iceland',
    code: 'ISL',
    woeid: 0,
    value: 295732,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ISL',
      count:  1, 
    },
  },
  {
    name: 'India',
    code: 'IND',
    woeid: 23424848,
    value: 1134403141,
    ppd: 0.22,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IND',
      count:  1, 
    },
  },
  {
    name: 'Iran (Islamic Republic of)',
    code: 'IRN',
    woeid: 0,
    value: 69420607,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IRN',
      count:  1, 
    },
  },
  {
    name: 'Israel',
    code: 'ISR',
    woeid: 23424852,
    value: 6692037,
    ppd: 0.32,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ISR',
      count:  1, 
    },
  },
  {
    name: 'Italy',
    code: 'ITA',
    woeid: 23424853,
    value: 5864636,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ITA',
      count:  1, 
    },
  },
  {
    name: "Cote d'Ivoire",
    code: 'CIV',
    woeid: 0,
    value: 18584701,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CIV',
      count:  1, 
    },
  },
  {
    name: 'Iraq',
    code: 'IRQ',
    woeid: 0,
    value: 27995984,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IRQ',
      count:  1, 
    },
  },
  {
    name: 'Japan',
    code: 'JPN',
    woeid: 23424856,
    value: 127896740,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#JPN',
      count:  1, 
    },
  },
  {
    name: 'Jamaica',
    code: 'JAM',
    woeid: 0,
    value: 2682469,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#JAM',
      count:  1, 
    },
  },
  {
    name: 'Jordan',
    code: 'JOR',
    woeid: 23424860,
    value: 5544066,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#JOR',
      count:  1, 
    },
  },
  {
    name: 'Kenya',
    code: 'KEN',
    woeid: 23424863,
    value: 35598952,
    ppd: 0.20,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KEN',
      count:  1, 
    },
  },
  {
    name: 'Kyrgyzstan',
    code: 'KGZ',
    woeid: 0,
    value: 5203547,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KGZ',
      count:  1, 
    },
  },
  {
    name: "Democratic People's Republic of Korea",
    code: 'PRK',
    woeid: 0,
    value: 25955138,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PRK',
      count:  1, 
    },
  },
  {
    name: 'Kiribati',
    code: 'KIR',
    woeid: 0,
    value: 92003,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KIR',
      count:  1, 
    },
  },
  {
    name: 'Republic of Korea',
    code: 'KOR',
    woeid: 23424868,
    value: 51696216,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KOR',
      count:  1, 
    },
  },
  {
    name: 'Kuwait',
    code: 'KWT',
    woeid: 23424870,
    value: 4982981,
    ppd: 0.34,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KWT',
      count:  1, 
    },
  },
  {
    name: 'Kazakhstan',
    code: 'KAZ',
    woeid: 0,
    value: 15210609,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KAZ',
      count:  1, 
    },
  },
  {
    name: "Lao People's Democratic Republic",
    code: 'LAO',
    woeid: 0,
    value: 566391,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LAO',
      count:  1, 
    },
  },
  {
    name: 'Lebanon',
    code: 'LBN',
    woeid: 23424873,
    value: 5364482,
    ppd: 0.32,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LBN',
      count:  1, 
    },
  },
  {
    name: 'Latvia',
    code: 'LVA',
    woeid: 23424874,
    value: 2301793,
    ppd: 0.27,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LVA',
      count:  1, 
    },
  },
  {
    name: 'Belarus',
    code: 'BLR',
    woeid: 23424765,
    value: 9795287,
    ppd: 0.22,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BLR',
      count:  1, 
    },
  },
  {
    name: 'Lithuania',
    code: 'LTU',
    woeid: 0,
    value: 3425077,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LTU',
      count:  1, 
    },
  },
  {
    name: 'Liberia',
    code: 'LBR',
    woeid: 0,
    value: 3441796,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LBR',
      count:  1, 
    },
  },
  {
    name: 'Slovakia',
    code: 'SVK',
    woeid: 0,
    value: 5386995,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SVK',
      count:  1, 
    },
  },
  {
    name: 'Liechtenstein',
    code: 'LIE',
    woeid: 0,
    value: 34598,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LIE',
      count:  1, 
    },
  },
  {
    name: 'Libyan Arab Jamahiriya',
    code: 'LBY',
    woeid: 0,
    value: 5918217,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LBY',
      count:  1, 
    },
  },
  {
    name: 'Madagascar',
    code: 'MDG',
    woeid: 0,
    value: 18642586,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MDG',
      count:  1, 
    },
  },
  {
    name: 'Martinique',
    code: 'MTQ',
    woeid: 0,
    value: 395896,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MTQ',
      count:  1, 
    },
  },
  {
    name: 'Mongolia',
    code: 'MNG',
    woeid: 0,
    value: 2580704,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MNG',
      count:  1, 
    },
  },
  {
    name: 'Montserrat',
    code: 'MSR',
    woeid: 0,
    value: 5628,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MSR',
      count:  1, 
    },
  },
  {
    name: 'The former Yugoslav Republic of Macedonia',
    code: 'MKD',
    woeid: 0,
    value: 2033655,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MKD',
      count:  1, 
    },
  },
  {
    name: 'Mali',
    code: 'MLI',
    woeid: 0,
    value: 1161109,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MLI',
      count:  1, 
    },
  },
  {
    name: 'Morocco',
    code: 'MAR',
    woeid: 0,
    value: 30494991,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MAR',
      count:  1, 
    },
  },
  {
    name: 'Mauritius',
    code: 'MUS',
    woeid: 0,
    value: 1241173,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MUS',
      count:  1, 
    },
  },
  {
    name: 'Mauritania',
    code: 'MRT',
    woeid: 0,
    value: 2963105,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MRT',
      count:  1, 
    },
  },
  {
    name: 'Malta',
    code: 'MLT',
    woeid: 0,
    value: 402617,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MLT',
      count:  1, 
    },
  },
  {
    name: 'Oman',
    code: 'OMN',
    woeid: 23424898,
    value: 2507042,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#OMN',
      count:  1, 
    },
  },
  {
    name: 'Maldives',
    code: 'MDV',
    woeid: 0,
    value: 295297,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MDV',
      count:  1, 
    },
  },
  {
    name: 'Mexico',
    code: 'MEX',
    woeid: 23424900,
    value: 104266392,
    ppd: 0.32,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MEX',
      count:  1, 
    },
  },
  {
    name: 'Malaysia',
    code: 'MYS',
    woeid: 23424901,
    value: 25652985,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MYS',
      count:  1, 
    },
  },
  {
    name: 'Mozambique',
    code: 'MOZ',
    woeid: 0,
    value: 20532675,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MOZ',
      count:  1, 
    },
  },
  {
    name: 'Malawi',
    code: 'MWI',
    woeid: 0,
    value: 13226091,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MWI',
      count:  1, 
    },
  },
  {
    name: 'New Caledonia',
    code: 'NCL',
    woeid: 0,
    value: 234185,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NCL',
      count:  1, 
    },
  },
  {
    name: 'Niue',
    code: 'NIU',
    woeid: 0,
    value: 1632,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NIU',
      count:  1, 
    },
  },
  {
    name: 'Niger',
    code: 'NER',
    woeid: 0,
    value: 1326419,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NER',
      count:  1, 
    },
  },
  {
    name: 'Aruba',
    code: 'ABW',
    woeid: 0,
    value: 102897,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ABW',
      count:  1, 
    },
  },
  {
    name: 'Anguilla',
    code: 'AIA',
    woeid: 0,
    value: 12256,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AIA',
      count:  1, 
    },
  },
  {
    name: 'Belgium',
    code: 'BEL',
    woeid: 23424757,
    value: 10398049,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BEL',
      count:  1, 
    },
  },
  {
    name: 'Hong Kong',
    code: 'HKG',
    woeid: 0,
    value: 7057418,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#HKG',
      count:  1, 
    },
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MNP',
    woeid: 0,
    value: 80258,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MNP',
      count:  1, 
    },
  },
  {
    name: 'Faroe Islands',
    code: 'FRO',
    woeid: 0,
    value: 48205,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#FRO',
      count:  1, 
    },
  },
  {
    name: 'Andorra',
    code: 'AND',
    woeid: 0,
    value: 73483,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#AND',
      count:  1, 
    },
  },
  {
    name: 'Gibraltar',
    code: 'GIB',
    woeid: 0,
    value: 291,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GIB',
      count:  1, 
    },
  },
  {
    name: 'Isle of Man',
    code: 'IMN',
    woeid: 0,
    value: 78357,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IMN',
      count:  1, 
    },
  },
  {
    name: 'Luxembourg',
    code: 'LUX',
    woeid: 0,
    value: 456613,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LUX',
      count:  1, 
    },
  },
  {
    name: 'Macau',
    code: 'MAC',
    woeid: 0,
    value: 47309,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MAC',
      count:  1, 
    },
  },
  {
    name: 'Monaco',
    code: 'MCO',
    woeid: 0,
    value: 325,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MCO',
      count:  1, 
    },
  },
  {
    name: 'Palestine',
    code: 'PSE',
    woeid: 0,
    value: 3762005,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PSE',
      count:  1, 
    },
  },
  {
    name: 'Montenegro',
    code: 'MNE',
    woeid: 0,
    value: 607969,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MNE',
      count:  1, 
    },
  },
  {
    name: 'Mayotte',
    code: 'MYT',
    woeid: 0,
    value: 279500,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MYT',
      count:  1, 
    },
  },
  {
    name: 'Åland Islands',
    code: 'ALA',
    woeid: 0,
    value: 30696,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ALA',
      count:  1, 
    },
  },
  {
    name: 'Norfolk Island',
    code: 'NFK',
    woeid: 0,
    value: 1748,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NFK',
      count:  1, 
    },
  },
  {
    name: 'Cocos (Keeling) Islands',
    code: 'CCK',
    woeid: 0,
    value: 544,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CCK',
      count:  1, 
    },
  },
  {
    name: 'Antarctica',
    code: 'ATA',
    woeid: 0,
    value: 3000,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ATA',
      count:  1, 
    },
  },
  {
    name: 'Bouvet Island',
    code: 'BVT',
    woeid: 0,
    value: 0,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BVT',
      count:  1, 
    },
  },
  {
    name: 'French Southern and Antarctic Lands',
    code: 'ATF',
    woeid: 0,
    value: 600,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ATF',
      count:  1, 
    },
  },
  {
    name: 'Heard Island and McDonald Islands',
    code: 'HMD',
    woeid: 0,
    value: 0,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#HMD',
      count:  1, 
    },
  },
  {
    name: 'British Indian Ocean Territory',
    code: 'IOT',
    woeid: 0,
    value: 0,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IOT',
      count:  1, 
    },
  },
  {
    name: 'Christmas Island',
    code: 'CXR',
    woeid: 0,
    value: 1692,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CXR',
      count:  1, 
    },
  },
  {
    name: 'United States Minor Outlying Islands',
    code: 'UMI',
    woeid: 0,
    value: 300,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#UMI',
      count:  1, 
    },
  },
  {
    name: 'Vanuatu',
    code: 'VUT',
    woeid: 0,
    value: 215366,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VUT',
      count:  1, 
    },
  },
  {
    name: 'Nigeria',
    code: 'NGA',
    woeid: 23424908,
    value: 141356083,
    ppd: 0.17,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NGA',
      count:  1, 
    },
  },
  {
    name: 'Netherlands',
    code: 'NLD',
    woeid: 23424909,
    value: 1632769,
    ppd: 0.31,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NLD',
      count:  1, 
    },
  },
  {
    name: 'Norway',
    code: 'NOR',
    woeid: 23424910,
    value: 4638836,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NOR',
      count:  1, 
    },
  },
  {
    name: 'Nepal',
    code: 'NPL',
    woeid: 0,
    value: 27093656,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NPL',
      count:  1, 
    },
  },
  {
    name: 'Nauru',
    code: 'NRU',
    woeid: 0,
    value: 10111,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NRU',
      count:  1, 
    },
  },
  {
    name: 'Suriname',
    code: 'SUR',
    woeid: 0,
    value: 452468,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SUR',
      count:  1, 
    },
  },
  {
    name: 'Nicaragua',
    code: 'NIC',
    woeid: 0,
    value: 5462539,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NIC',
      count:  1, 
    },
  },
  {
    name: 'New Zealand',
    code: 'NZL',
    woeid: 23424916,
    value: 4097112,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NZL',
      count:  1, 
    },
  },
  {
    name: 'Paraguay',
    code: 'PRY',
    woeid: 0,
    value: 5904342,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PRY',
      count:  1, 
    },
  },
  {
    name: 'Peru',
    code: 'PER',
    woeid: 23424919,
    value: 27274266,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PER',
      count:  1, 
    },
  },
  {
    name: 'Pakistan',
    code: 'PAK',
    woeid: 23424922,
    value: 158080591,
    ppd: 0.16,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PAK',
      count:  1, 
    },
  },
  {
    name: 'Poland',
    code: 'POL',
    woeid: 23424923,
    value: 38195558,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#POL',
      count:  1, 
    },
  },
  {
    name: 'Panama',
    code: 'PAN',
    woeid: 23424924,
    value: 3231502,
    ppd: 0.29,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PAN',
      count:  1, 
    },
  },
  {
    name: 'Portugal',
    code: 'PRT',
    woeid: 23424925,
    value: 10528226,
    ppd: 0.29,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PRT',
      count:  1, 
    },
  },
  {
    name: 'Papua New Guinea',
    code: 'PNG',
    woeid: 0,
    value: 6069715,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PNG',
      count:  1, 
    },
  },
  {
    name: 'Guinea-Bissau',
    code: 'GNB',
    woeid: 0,
    value: 1596929,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GNB',
      count:  1, 
    },
  },
  {
    name: 'Qatar',
    code: 'QAT',
    woeid: 23424930,
    value: 796186,
    ppd: 0.36,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#QAT',
      count:  1, 
    },
  },
  {
    name: 'Reunion',
    code: 'REU',
    woeid: 0,
    value: 785159,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#REU',
      count:  1, 
    },
  },
  {
    name: 'Romania',
    code: 'ROU',
    woeid: 0,
    value: 21627557,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ROU',
      count:  1, 
    },
  },
  {
    name: 'Republic of Moldova',
    code: 'MDA',
    woeid: 0,
    value: 3876661,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MDA',
      count:  1, 
    },
  },
  {
    name: 'Philippines',
    code: 'PHL',
    woeid: 23424934,
    value: 84566163,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PHL',
      count:  1, 
    },
  },
  {
    name: 'Puerto Rico',
    code: 'PRI',
    woeid: 23424935,
    value: 3946779,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PRI',
      count:  1, 
    },
  },
  {
    name: 'Russia',
    code: 'RUS',
    woeid: 23424936,
    value: 143953092,
    ppd: 0.18,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#RUS',
      count:  1, 
    },
  },
  {
    name: 'Rwanda',
    code: 'RWA',
    woeid: 0,
    value: 9233793,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#RWA',
      count:  1, 
    },
  },
  {
    name: 'Saudi Arabia',
    code: 'SAU',
    woeid: 23424938,
    value: 2361236,
    ppd: 0.35,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SAU',
      count:  1, 
    },
  },
  {
    name: 'Saint Kitts and Nevis',
    code: 'KNA',
    woeid: 0,
    value: 49138,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#KNA',
      count:  1, 
    },
  },
  {
    name: 'Seychelles',
    code: 'SYC',
    woeid: 0,
    value: 85532,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SYC',
      count:  1, 
    },
  },
  {
    name: 'South Africa',
    code: 'ZAF',
    woeid: 23424942,
    value: 47938663,
    ppd: 0.25,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ZAF',
      count:  1, 
    },
  },
  {
    name: 'Lesotho',
    code: 'LSO',
    woeid: 0,
    value: 1980831,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LSO',
      count:  1, 
    },
  },
  {
    name: 'Botswana',
    code: 'BWA',
    woeid: 0,
    value: 1835938,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BWA',
      count:  1, 
    },
  },
  {
    name: 'Senegal',
    code: 'SEN',
    woeid: 0,
    value: 1177034,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SEN',
      count:  1, 
    },
  },
  {
    name: 'Slovenia',
    code: 'SVN',
    woeid: 0,
    value: 1999425,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SVN',
      count:  1, 
    },
  },
  {
    name: 'Sierra Leone',
    code: 'SLE',
    woeid: 0,
    value: 5586403,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SLE',
      count:  1, 
    },
  },
  {
    name: 'Singapore',
    code: 'SGP',
    woeid: 23424948,
    value: 4327468,
    ppd: 0.33,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SGP',
      count:  1, 
    },
  },
  {
    name: 'Somalia',
    code: 'SOM',
    woeid: 0,
    value: 8196395,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SOM',
      count:  1, 
    },
  },
  {
    name: 'Spain',
    code: 'ESP',
    woeid: 23424950,
    value: 43397491,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ESP',
      count:  1, 
    },
  },
  {
    name: 'Saint Lucia',
    code: 'LCA',
    woeid: 0,
    value: 16124,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#LCA',
      count:  1, 
    },
  },
  {
    name: 'Sudan',
    code: 'SDN',
    woeid: 0,
    value: 36899747,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SDN',
      count:  1, 
    },
  },
  {
    name: 'Sweden',
    code: 'SWE',
    woeid: 23424954,
    value: 9038049,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SWE',
      count:  1, 
    },
  },
  {
    name: 'Syrian Arab Republic',
    code: 'SYR',
    woeid: 0,
    value: 18893881,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SYR',
      count:  1, 
    },
  },
  {
    name: 'Switzerland',
    code: 'CHE',
    woeid: 23424957,
    value: 7424389,
    ppd: 0.31,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#CHE',
      count:  1, 
    },
  },
  {
    name: 'Trinidad and Tobago',
    code: 'TTO',
    woeid: 0,
    value: 1323722,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TTO',
      count:  1, 
    },
  },
  {
    name: 'Thailand',
    code: 'THA',
    woeid: 23424960,
    value: 63002911,
    ppd: 0.22,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#THA',
      count:  1, 
    },
  },
  {
    name: 'Tajikistan',
    code: 'TJK',
    woeid: 0,
    value: 6550213,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TJK',
      count:  1, 
    },
  },
  {
    name: 'Tokelau',
    code: 'TKL',
    woeid: 0,
    value: 1401,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TKL',
      count:  1, 
    },
  },
  {
    name: 'Tonga',
    code: 'TON',
    woeid: 0,
    value: 99361,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TON',
      count:  1, 
    },
  },
  {
    name: 'Togo',
    code: 'TGO',
    woeid: 0,
    value: 6238572,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TGO',
      count:  1, 
    },
  },
  {
    name: 'Sao Tome and Principe',
    code: 'STP',
    woeid: 0,
    value: 152622,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#STP',
      count:  1, 
    },
  },
  {
    name: 'Tunisia',
    code: 'TUN',
    woeid: 0,
    value: 10104685,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TUN',
      count:  1, 
    },
  },
  {
    name: 'Turkey',
    code: 'TUR',
    woeid: 23424969,
    value: 72969723,
    ppd: 0.27,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TUR',
      count:  1, 
    },
  },
  {
    name: 'Tuvalu',
    code: 'TUV',
    woeid: 0,
    value: 10441,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TUV',
      count:  1, 
    },
  },
  {
    name: 'Turkmenistan',
    code: 'TKM',
    woeid: 0,
    value: 4833266,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TKM',
      count:  1, 
    },
  },
  {
    name: 'United Republic of Tanzania',
    code: 'TZA',
    woeid: 0,
    value: 38477873,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TZA',
      count:  1, 
    },
  },
  {
    name: 'Uganda',
    code: 'UGA',
    woeid: 0,
    value: 28947181,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#UGA',
      count:  1, 
    },
  },
  {
    name: 'United Kingdom',
    code: 'GBR',
    woeid: 23424975,
    value: 60244834,
    ppd: 0.30,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GBR',
      count:  1, 
    },
  },
  {
    name: 'Ukraine',
    code: 'UKR',
    woeid: 23424976,
    value: 46917544,
    ppd: 0.26,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#UKR',
      count:  1, 
    },
  },
  {
    name: 'United States',
    code: 'USA',
    woeid: 23424977,
    value: 299846449,
    ppd: 0.28,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#USA',
      count:  1, 
    },
  },
  {
    name: 'Burkina Faso',
    code: 'BFA',
    woeid: 0,
    value: 13933363,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BFA',
      count:  1, 
    },
  },
  {
    name: 'Uruguay',
    code: 'URY',
    woeid: 0,
    value: 3325727,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#URY',
      count:  1, 
    },
  },
  {
    name: 'Uzbekistan',
    code: 'UZB',
    woeid: 0,
    value: 26593123,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#UZB',
      count:  1, 
    },
  },
  {
    name: 'Saint Vincent and the Grenadines',
    code: 'VCT',
    woeid: 0,
    value: 119137,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VCT',
      count:  1, 
    },
  },
  {
    name: 'Venezuela',
    code: 'VEN',
    woeid: 23424982,
    value: 26725573,
    ppd: 0.22,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VEN',
      count:  1, 
    },
  },
  {
    name: 'British Virgin Islands',
    code: 'VGB',
    woeid: 0,
    value: 22016,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VGB',
      count:  1, 
    },
  },
  {
    name: 'Vietnam',
    code: 'VNM',
    woeid: 23424984,
    value: 85028643,
    ppd: 0.22,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VNM',
      count:  1, 
    },
  },
  {
    name: 'United States Virgin Islands',
    code: 'VIR',
    woeid: 0,
    value: 111408,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VIR',
      count:  1, 
    },
  },
  {
    name: 'Namibia',
    code: 'NAM',
    woeid: 0,
    value: 2019677,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#NAM',
      count:  1, 
    },
  },
  {
    name: 'Wallis and Futuna Islands',
    code: 'WLF',
    woeid: 0,
    value: 15079,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#WLF',
      count:  1, 
    },
  },
  {
    name: 'Samoa',
    code: 'WSM',
    woeid: 0,
    value: 183845,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#WSM',
      count:  1, 
    },
  },
  {
    name: 'Swaziland',
    code: 'SWZ',
    woeid: 0,
    value: 1124529,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SWZ',
      count:  1, 
    },
  },
  {
    name: 'Yemen',
    code: 'YEM',
    woeid: 0,
    value: 21095679,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#YEM',
      count:  1, 
    },
  },
  {
    name: 'Zambia',
    code: 'ZMB',
    woeid: 0,
    value: 11478317,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ZMB',
      count:  1, 
    },
  },
  {
    name: 'Zimbabwe',
    code: 'ZWE',
    woeid: 0,
    value: 13119679,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ZWE',
      count:  1, 
    },
  },
  {
    name: 'Indonesia',
    code: 'IDN',
    woeid: 23424846,
    value: 226063044,
    ppd: 0.25,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#IDN',
      count:  1, 
    },
  },
  {
    name: 'Guadeloupe',
    code: 'GLP',
    woeid: 0,
    value: 438403,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GLP',
      count:  1, 
    },
  },
  {
    name: 'Netherlands Antilles',
    code: 'ANT',
    woeid: 0,
    value: 186392,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ANT',
      count:  1, 
    },
  },
  {
    name: 'United Arab Emirates',
    code: 'ARE',
    woeid: 23424738,
    value: 4104291,
    ppd: 0.38,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ARE',
      count:  1, 
    },
  },
  {
    name: 'Timor-Leste',
    code: 'TLS',
    woeid: 0,
    value: 1067285,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TLS',
      count:  1, 
    },
  },
  {
    name: 'Pitcairn Islands',
    code: 'PCN',
    woeid: 0,
    value: 35,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PCN',
      count:  1, 
    },
  },
  {
    name: 'Palau',
    code: 'PLW',
    woeid: 0,
    value: 20127,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#PLW',
      count:  1, 
    },
  },
  {
    name: 'Marshall Islands',
    code: 'MHL',
    woeid: 0,
    value: 5672,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MHL',
      count:  1, 
    },
  },
  {
    name: 'Saint Pierre and Miquelon',
    code: 'SPM',
    woeid: 0,
    value: 6346,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SPM',
      count:  1, 
    },
  },
  {
    name: 'Saint Helena',
    code: 'SHN',
    woeid: 0,
    value: 6399,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SHN',
      count:  1, 
    },
  },
  {
    name: 'San Marino',
    code: 'SMR',
    woeid: 0,
    value: 30214,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SMR',
      count:  1, 
    },
  },
  {
    name: 'Turks and Caicos Islands',
    code: 'TCA',
    woeid: 0,
    value: 24459,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TCA',
      count:  1, 
    },
  },
  {
    name: 'Western Sahara',
    code: 'ESH',
    woeid: 0,
    value: 440428,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#ESH',
      count:  1, 
    },
  },
  {
    name: 'Serbia',
    code: 'SRB',
    woeid: 0,
    value: 9863026,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SRB',
      count:  1, 
    },
  },
  {
    name: 'Holy See (Vatican City)',
    code: 'VAT',
    woeid: 0,
    value: 783,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#VAT',
      count:  1, 
    },
  },
  {
    name: 'Svalbard',
    code: 'SJM',
    woeid: 0,
    value: 2530,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SJM',
      count:  1, 
    },
  },
  {
    name: 'Saint Martin',
    code: 'MAF',
    woeid: 0,
    value: 8123,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#MAF',
      count:  1, 
    },
  },
  {
    name: 'Saint Barthelemy',
    code: 'BLM',
    woeid: 0,
    value: 10967,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#BLM',
      count:  1, 
    },
  },
  {
    name: 'Guernsey',
    code: 'GGY',
    woeid: 0,
    value: 63950,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#GGY',
      count:  1, 
    },
  },
  {
    name: 'Jersey',
    code: 'JEY',
    woeid: 0,
    value: 103267,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#JEY',
      count:  1, 
    },
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    code: 'SGS',
    woeid: 0,
    value: 0,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#SGS',
      count:  1, 
    },
  },
  {
    name: 'Taiwan',
    code: 'TWN',
    woeid: 0,
    value: 23588932,
    ppd: 0,
    trends: [
      { name: '#foo', tweet_volume: 0 },
    ],
    hashtag: { 
      hashstr: '#TWN',
      count:  1, 
    },
  },
];