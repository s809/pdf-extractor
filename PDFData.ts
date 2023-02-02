export interface RootObject {
  Transcoder: string;
  Meta: Meta;
  Pages: Page[];
}

export interface Page {
  Width: number;
  Height: number;
  HLines: any[];
  VLines: any[];
  Fills: any[];
  Texts: Text[];
  Fields: any[];
  Boxsets: any[];
}

export interface Text {
  x: number;
  y: number;
  w: number;
  oc: string;
  sw: number;
  A: string;
  R: R[];
}

export interface R {
  T: string;
  S: number;
  TS: number[];
  RA?: number;
}

export interface Meta {
  PDFFormatVersion: string;
  IsAcroFormPresent: boolean;
  IsXFAPresent: boolean;
  Title: string;
  Creator: string;
  Producer: string;
  CreationDate: string;
  ModDate: string;
  Metadata: Metadata;
}

export interface Metadata {
  'dc:format': string;
  'dc:title': string;
  'xmp:metadatadate': string;
  'xmp:modifydate': string;
  'xmp:createdate': string;
  'xmp:creatortool': string;
  'xmp:thumbnails': string;
  'xmpmm:instanceid': string;
  'xmpmm:documentid': string;
  'xmpmm:originaldocumentid': string;
  'xmpmm:renditionclass': string;
  'xmpmm:derivedfrom': string;
  'xmpmm:history': string;
  'illustrator:startupprofile': string;
  'illustrator:creatorsubtool': string;
  'xmptpg:hasvisibleoverprint': string;
  'xmptpg:hasvisibletransparency': string;
  'xmptpg:npages': string;
  'xmptpg:maxpagesize': string;
  'xmptpg:fonts': string;
  'xmptpg:platenames': string;
  'xmptpg:swatchgroups': string;
  'pdf:producer': string;
}