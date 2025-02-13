import { RNHTMLtoPDF } from 'react-native-html-to-pdf-custom';
import Toast from 'react-native-simple-toast';

export async function CustomPDF(model) {
    let options = {
        html:
            '<html><head><style>table {border-collapse: collapse;width:100%}td,th {border: 1px solid #dddddd;text-align: center}</style></head><body>' +
            '<h1 style="text-align: center; color: #30c39e">Daddy Check</h1>' +
            '<table><tr style="background-color: #30c39e"><th>Full Name</th><th>Phone Number</th></tr>' +
            '<tr><td>' + model.fullName + '</td><td>' + model.phoneNumber + '</td></tr></table>' +
            '<h4 style="text-align: center">Information</h4>' +
            '<table><tr style="background-color: #30c39e"><th>Analysis Date</th><th>Analysis Time</th></tr>' +
            '<tr><td>' + model.date + '</td><td>' + model.time + '</td></tr></table>' +

            '<h4 style="text-align: center">Initial Data</h4>' +
            '<table><tr style="background-color: #30c39e"><th>Parameter</th><th>Value</th><th>Normal Range</th></tr>' +
            '<tr><td>volume(ml)</td><td>' + model.volume + '</td><td> >1.5 ml </td></tr>' +
            '<tr><td>color</td><td> ' + model.color + ' </td><td> Milky </td></tr>' +
            '<tr><td>viscosity</td><td> ' + model.viscosity + ' </td><td> Normal </td></tr></table>' +

            '<h4 style="text-align: center">Motility Result</h4>' +
            '<table><tr style="background-color: #30c39e"><th>Spermatozoa</th><th>Value</th><th>Reference Value</th></tr>' +
            '<tr><td>Quantity</td><td> ' + model.quantity + ' </td><td>-</td></tr>' +
            '<tr><td>Concentration </td><td> ' + '-' + ' </td><td>15</td></tr></table><br />' +

            '<table><tr style="background-color: #30c39e"><th>Spermatozoa</th><th>Value</th><th>%</th><th>Reference Value</th></tr>' +
            '<tr><td>Total Motile</td><td> ' + '-' + ' </td><td> ' + '-' + '  </td><td>  >40%  </td></tr>' +
            '<tr><td>Progressive</td><td> ' + model.prog + ' </td><td> ' + '-' + ' </td><td> >32% </td></tr>' +
            '<tr><td>None-progressive</td><td> ' + model.n_prog + ' </td><td> ' + '-' + '</td><td>  </td></tr>' +
            '<tr><td>Immotile</td><td> ' + model.immotile + ' </td><td> ' + '-' + ' </td><td> <60% </td></tr></table><br />' +
            '<h4 style="text-align: center">Processed Photo From Sample</h4>' +
            '<img style="width:100%; height: 200px;" src="' + `file://${model.imgUrl}` + '"/>' +
            '</body></html>'
        ,
        fileName: model.title,
        directory: 'docs'
    };
    let file = await RNHTMLtoPDF.convert(options);
    Toast.show("با موفقیت دانلود شد");
};