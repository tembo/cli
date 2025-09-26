{
  description = "y CLI application";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      packages.default = pkgs.buildNpmPackage {
        pname = "tembo";
        version = "1.0.0";
        src = ./.;
        npmDepsHash = "sha256-lH2DjUMkCGI2SvMAWS0KNqOcgrw0otbs1sVu3LOLAhU=";
        nativeBuildInputs = [pkgs.nodejs];
        buildPhase = ''
          npm run build
        '';
      };
    });
}
