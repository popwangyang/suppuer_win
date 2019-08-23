export default {
	title: '云音乐',
	fileType: ['mpeg', 'mp4', 'mpg', 'mkv'],
	titles: [
		{
			name: '',
			width: 5,
			key: 'checkbox'
		},
		{
			name: '歌曲名称',
			width: 15,
			key: 'name'
	    },
		{
			name: '歌手名称',
			width: 15,
			key: 'singer'
		},
		{
			name: '格式',
			width: 11,
			key: 'format_type'
		},
		{
			name: '上传日期',
			width: 15,
			key: 'create_date'
		},
		{
			name: '大小',
			width: 10,
			key: 'size'
		},
		{
			name: '状态',
			width: 15,
			key: 'statue'
		},
		{
			name: '操作',
			width: 14,
			key: 'operation'
		},
	],
	songInfoData:{
		language:[
			{
				label:'国语',
				value:0
			},
			{
				label:'粤语',
				value:1
			},
			{
				label:'闽南语',
				value:2
			},
			{
				label:'英语',
				value:3
			},
			{
				label:'日语',
				value:4
			},
			{
				label:'韩语',
				value:5
			},
			{
				label:'其他',
				value:6
			},
		],
		picture: [
			{
				label:'原版MV',
				value:0
			},
			{
				label:'LIVE',
				value:1
			},
			{
				label:'舞曲',
				value:2
			},
			{
				label:'配置画面',
				value:3
			},
			{
				label:'MTV',
				value:4
			}
		],
		area:[
			{
				label:'大陆',
				value:0
			},
			{
				label:'港台',
				value:1
			},
			{
				label:'日韩',
				value:2
			},
			{
				label:'欧美',
				value:3
			},
			{
				label:'其他',
				value:4
			}
		],
		format_type:[
			{
				label:'高清',
				value:0
			},
			{
				label:'DVD',
				value:1
			},
			{
				label:'MP4',
				value:2
			},
			{
				label:'其他',
				value:3
			},
			{
				label:'MKV',
				value:4
			}
		],
		voice_type: [
			{
				label:'消音',
				value: 0
			},
			{
				label:'原版伴奏',
				value:1
			},
			{
				label:'演唱会',
				value:2
			},
			{
				label:'remix',
				value:3
			},
			{
				label:'其他',
				value:4
			}
		],
		voice_track: [
			{
				label:'1',
				value:0
			},
			{
				label:'2',
				value:1
			},
			{
				label:'左',
				value:2
			},
			{
				label:'右',
				value:3
			}
		],
		vocal_track: [
			{
				label:'1',
				value:0
			},
			{
				label:'2',
				value:1
			},
			{
				label:'左',
				value:2
			},
			{
				label:'右',
				value:3
			}
		],
		singer_type:[
			{
				label:'男歌手',
				value:0
			},
			{
				label:'女歌手',
				value:1
			},
			{
				label:'组合',
				value:2
			},
			{
				label:'合唱',
				value:3
			}
		],
		save_sign: [
			{
			   label:'老哥',
			   value:0
			},
			{
			   label:'授权歌曲',
			   value:1
			},
			{
			   label:'新歌',
			   value:2
			},
		]
	}

}