export type Pet = {
  id: number;
  name?: string;
  tag?: string;
};

export type Pets = Array<Pet>;

export type Error = {
  code: number;
  message?: string;
};

export type GetPetsQueryParameters = {
  limit?: number;
};

export interface ApiResponse<T> extends Response {
  json(): Promise<T>;
}
export type RequestFactoryType = (
  path: string,
  query: any,
  body: any,
  formData: any,
  headers: any,
  method: string,
  configuration: any
) => Promise<ApiResponse<any>>;

export class PetStore<T extends {} = {}> {
  constructor(
    protected configuration: T,
    protected requestFactory: RequestFactoryType
  ) {}
  GetPets(query: GetPetsQueryParameters): Promise<ApiResponse<Pets | Error>> {
    const path = "/pets";
    return this.requestFactory(
      path,
      query,
      undefined,
      undefined,
      undefined,
      "GET",
      this.configuration
    );
  }

  PostPets(): Promise<ApiResponse<any | Error>> {
    const path = "/pets";
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      undefined,
      "POST",
      this.configuration
    );
  }

  GetPetsByPetId(
    petIdPathParameter: string
  ): Promise<ApiResponse<Pets | Error>> {
    let path = "/pets/{petId}";
    path = path.replace("{petId}", String(petIdPathParameter));
    return this.requestFactory(
      path,
      undefined,
      undefined,
      undefined,
      undefined,
      "GET",
      this.configuration
    );
  }
}
