// This file is the template registry serves as the template registry.
// When templates are loaded, their name will be compared to the keys of the
// exported object and that template will be used. If a template cannot be
// found, the default template will be used instead.

// TODO: Use dynamic loading to prevent all templates to be loaded at once.
import DefaultTemplate from "./default";
import CustomTemplate from "./customTemplate";
import GovTechDemoCert from "./govtechDemoCert";
import SMUCertificate1 from "./degree-cert-template1";
import SMUCertificate2 from "./degree-cert-template2";
import SMUCertificate3 from "./degree-cert-template3";
import SMUTranscript from "./transcript-template";

export default {
  default: DefaultTemplate,
  CUSTOM_TEMPLATE: CustomTemplate,
  GOVTECH_DEMO: GovTechDemoCert,
  SMUCertificate1: SMUCertificate1,
  SMUCertificate2: SMUCertificate2,
  SMUCertificate3: SMUCertificate3,
  SMUTranscript: SMUTranscript,
  NULL: []
};
