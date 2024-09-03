//Chetan Patil - [20-07-23] - index page for reducers

import { BackgroundCheckReducer } from "./backgroundCheck";
import { CandidateReducer } from "./candidate";
import { ClientReducer } from "./client";
import { LoadingReducer } from "./loading";
import { RateRevisionReducer } from "./raterevision";
import { UserReducer } from "./user";
import { VendorReducer } from "./vendor";
import { ReferralReducer } from "./referral";
import { JobReducer } from "./job";
import { StartEndOperationsReducer } from "./startendoperations";
import { documentationReducer } from "./documentation";
import { AllReducer } from "./allData";
import { WorkAuthorizationReducer } from "./workAuthorization";
import { ContractTypeReducer } from "./contractType";


const appReducer: any = {
  all: AllReducer,
  user: UserReducer,
  loading: LoadingReducer,
  candidate: CandidateReducer,
  vendor: VendorReducer,
  client: ClientReducer,
  contractType: ContractTypeReducer,
  referral: ReferralReducer,
  job: JobReducer,
  rateRevision:RateRevisionReducer,
  backgroundCheck: BackgroundCheckReducer,
  startEndOperations: StartEndOperationsReducer,
  documentation: documentationReducer,
  workAuthorization: WorkAuthorizationReducer
};

export default appReducer;