const dynamicComps = {
{{each data.components}} 
{{$value.camelcase}}:() => import('{{$value.path}}'),
{{/each}}
};

export default dynamicComps;