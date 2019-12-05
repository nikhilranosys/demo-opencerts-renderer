import { templates as govtechDemoTemplates } from "./govtechDemoCert";
import { templates as SMUCertificate1 } from "./degree-cert-template1";
import { templates as SMUCertificate2 } from "./degree-cert-template2";
import { templates as SMUCertificate3 } from "./degree-cert-template3";
import { templates as SMUTranscript } from "./transcript-template";
import { TemplateRegistry } from "@govtechsg/decentralized-renderer-react-components";

export const registry: TemplateRegistry<any> = {
  default: govtechDemoTemplates,
  GOVTECH_DEMO: govtechDemoTemplates,
  SMUCertificate1: SMUCertificate1,
  SMUCertificate2: SMUCertificate2,
  SMUCertificate3: SMUCertificate3,
  SMUTranscript: SMUTranscript
};
